
import { currentUser } from 'src/decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { DITokens } from 'src/di';
import { IAuthService } from './interface-auth.service';
import { Account, LoginDto, RegisterAccountDto } from 'src/account';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/guard';
import { Request } from 'express';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(DITokens.AuthService) private readonly authService:IAuthService
  ){}
  @Post('/register')
  register(@Body() createUserDto: RegisterAccountDto) {
    return this.authService.register(createUserDto); 
  }
  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
  @UseGuards(AccessTokenGuard)
  @Get('/logout')
  logout(@Req() req) {
    console.log('logged out')
    this.authService.logout(req.user.id);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const email = req.user['email'];
    console.log(email)
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(email, refreshToken);
  }
}
