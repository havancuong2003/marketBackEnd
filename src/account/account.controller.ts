import {
  Controller,
  Get,
  Inject,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Body,
  Post,
} from '@nestjs/common';

import { IAccountService } from './interface-account.service';
import { DITokens } from 'src/di';
import { AccessTokenGuard } from 'src/guard';
import { Request } from 'express';
import { UpdateAccountDto } from './dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
@UseInterceptors(ClassSerializerInterceptor)
@Controller("/account")
export class AccountController {
  constructor(
    @Inject(DITokens.AccountService)
    private readonly accountService: IAccountService,
    
  ) {}
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() req:Request) {
    console.log(typeof req);
    console.log('find all : ', req.user['id']);
    return this.accountService.findAll();
  }
  @UseGuards(AccessTokenGuard)
  @Get("/show-information")
  showInformation(@Req() req:Request){
    return this.accountService.informationAccount(req.user['id']);
  }
  @UseGuards(AccessTokenGuard)
  @Post("/update-username")
  updateUserName(@Req() req:Request, @Body() updateUserDto: UpdateAccountDto){
    if(!updateUserDto.username){
      return {
        status:400,
        message:"username is required"
      }
    }
    return this.accountService.updateUserName(req.user['id'], updateUserDto.username);
  }
  @UseGuards(AccessTokenGuard)
  @Post("/update-password")
  async updatePassWord(@Req() req:Request, @Body() updateUserPassDto: UpdatePasswordDto){
    if(!updateUserPassDto.password){
      return {
        status:400,
        message:"password is required"
      }
    }

    if(updateUserPassDto.password !== updateUserPassDto.repassword){
      return {
        status:400,
        message:"password and repassword not match"
      }
    }

    if(updateUserPassDto.curentpassword === updateUserPassDto.password){
      return {
        status:400,
        message:"password not change"
      }
    }    

    return this.accountService.updatePassWord(req.user['id'], updateUserPassDto.password, updateUserPassDto.curentpassword);
  }


}
