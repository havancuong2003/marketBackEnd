import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAccountService } from 'src/account';
import { DITokens } from 'src/di';



type JwtPayload = {
  id: string;
  username: string;
  email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(@Inject(DITokens.AccountService) private readonly userService:IAccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }
  // async canActivate(context: ExecutionContext) {
    
  //   const request  = context.switchToHttp().getRequest();
  //       try {
  //           // 1)  get token jwt from headers
  //           const token = request.headers.authorization.split(' ')[1];
  //           console.log("Auth: ",token);

  //           // 2) jwtVerify validate token
  //           if(!token){
  //               throw new ForbiddenException('Please provide access token');
  //           }
  //           const payload = await this.jwtService.verifyAsync(token,{
  //               secret: process.env.JWT_SECRET,
  //           });
  //           // 3) find user in database on jwtVerify
  //           console.log("Auth: ",payload);
  //           const user = await this.userService.findByEmail(payload.email);
  //           console.log("Auth: ",user);
  //           if(!user){
  //               throw new BadRequestException('User not found');
  //           }
  //           // 4) Assign user to request
  //           request.currentUser = user;
  //           return true;
  //       } catch (error) {
  //           console.log("error from auth guard",error);
  //       }
  // }

  async validate(payload: JwtPayload) { 
    return payload;
  }
}