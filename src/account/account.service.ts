import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { IAccountService } from './interface-account.service';
import { RegisterAccountDto, UpdateAccountDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-account.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}
  findAll() {
    return this.accountRepository.find();
  }
  findByUserName(name: string) {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateAccountDto: UpdateAccountDto) {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string) {
    const user = this.accountRepository.findOneBy({ email: email });
    if (!user) throw new Error('user not found');
    return user;
  }
  async login(requestsBody: LoginDto) {
    const userByEmail = await this.findByEmail(requestsBody.email);
    if (!userByEmail) {
      throw new BadRequestException('User not found');
    }
    // check matching password
    const isMatch = await bcrypt.compare(
      requestsBody.password,
      userByEmail.password,
    );
    if (!isMatch) throw new BadRequestException('Invalid password');

    const payload = {
      id: userByEmail.id,
      email: userByEmail.email,
      username: userByEmail.username,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      msg: 'User has been login!',
      access_token,
    };
  }
  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }
  async register(requestsBody: RegisterAccountDto) {
    const user = await this.findByEmail(requestsBody.email);
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
    const saveUser = await this.accountRepository.create(requestsBody);
    this.accountRepository.save(saveUser);

    // generate jwt
    const payload = {
      id: saveUser.id,
      email: saveUser.email,
      username: saveUser.username,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      msg: 'User has been created!',
      access_token,
    };
  }
}
