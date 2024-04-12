import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Account, IAccountService, LoginDto, RegisterAccountDto } from 'src/account';
import { DITokens } from 'src/di';
import * as bcrypt from 'bcrypt';
import { IMailService } from 'src/mail';
import { UUID, randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './interface-auth.service';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(DITokens.AccountService)
    private readonly accountService: IAccountService,
    private jwtService: JwtService,
    @Inject(DITokens.MailService) private readonly mailService: IMailService,
    private configService: ConfigService,
  ) {}
  async login(requestsBody: LoginDto) {
    const userByEmail = await this.accountService.findByEmail(
      requestsBody.email,
    );
    if (!userByEmail) {
      throw new BadRequestException('User not found');
    }

    // check matching password
    const isMatch = await bcrypt.compare(
      requestsBody.password,
      userByEmail.password,
    );
    if (!isMatch) throw new BadRequestException('Invalid password');
    const tokens = await this.getTokens(userByEmail.id, userByEmail.username,userByEmail.email);
    await this.updateRefreshToken(userByEmail.id, tokens.refreshToken);
    return {
      msg: 'User has been login!',
      tokens: tokens,
    };
  }
  async register(requestsBody: RegisterAccountDto) {
    const userByUserName = await this.accountService.findByUserName(
      requestsBody.username,
    );
    if (userByUserName) {
      throw new BadRequestException('Username already exists');
    }
    const user = await this.accountService.findByEmail(requestsBody.email);
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    // generate uuid
    const uuid = randomUUID();
    requestsBody.id = uuid;
    // hash password
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(requestsBody.password, saltOrRounds);
    requestsBody.password = hashPassword;
    // save to db
    const saveUser = await this.accountService.create(requestsBody);
    this.accountService.save(saveUser);
    const tokens = await this.getTokens(saveUser.id, saveUser.username,saveUser.email);
    await this.updateRefreshToken(saveUser.id, tokens.refreshToken);
    this.mailService.sendUserConfirmation(requestsBody.email);
    return {
      message: 'Register successfully',
      tokens,
    };
  }
  hashData(data: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(data, 10);
  }
  async updateRefreshToken(account_id: UUID, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.accountService.update(account_id, {
      refresh_token: hashedRefreshToken,
    });
  }
 
  async getTokens(id: string, username: string,email:string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          username,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '60s',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          username,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async logout(userId: UUID) {
    return this.accountService.update(userId, { refresh_token: null });
  }
  async refreshTokens(email:string,refreshToken:string) {
    const user = await this.accountService.findByEmail(email);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refresh_token
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username,user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
