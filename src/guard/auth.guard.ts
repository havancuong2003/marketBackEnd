
/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IAccountService } from "src/account/interface-account.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService,private accountService:IAccountService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request  = context.switchToHttp().getRequest();
        try {
            // 1)  get token jwt from headers
            const token = request.headers.authorization.split(' ')[1];
            console.log("Auth: ",token);

            // 2) jwtVerify validate token
            if(!token){
                throw new ForbiddenException('Please provide access token');
            }
            const payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.JWT_SECRET,
            });
            // 3) find user in database on jwtVerify
            console.log("Auth: ",payload);
            const user = await this.accountService.findByUserName(payload.username);
            console.log("Auth: ",user);
            if(!user){
                throw new BadRequestException('Account not found');
            }
            // 4) Assign user to request
            request.currentUser = user;
            return true;
        } catch (error) {
            console.log("error from auth guard",error);
        }
    }
}