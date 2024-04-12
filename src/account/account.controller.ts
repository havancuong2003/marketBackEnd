import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Request,
} from '@nestjs/common';

import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccountService } from './interface-account.service';
import { DITokens } from 'src/di';
import { LoginDto, RegisterAccountDto } from './dto';
import { currentUser } from 'src/decorator';
import { Account } from './entities';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard } from 'src/guard';
@UseInterceptors(ClassSerializerInterceptor)
@Controller("/account")
export class AccountController {
  constructor(
    @Inject(DITokens.AccountService)
    private readonly accountService: IAccountService,
  ) {}
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Request() req) {
    console.log(typeof req);
    console.log('find all : ', req.user.id);
    return this.accountService.findAll();
  }

}
