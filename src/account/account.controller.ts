import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccountService} from './interface-account.service';
import { DITokens } from 'src/di';
import { LoginDto, RegisterAccountDto } from './dto';
import { AuthGuard } from 'src/guard';
import { currentUser } from 'src/decorator';
import { Account } from './entities';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('account')
export class AccountController {
  constructor(@Inject(DITokens.AccountService)private readonly accountService: IAccountService) {}
  
  @Post("/login")
  login(@Body() request:LoginDto){
    const data = this.accountService.login(request);
    return data;
  }
  @Post("/register")
  register(@Body() request:RegisterAccountDto){
    return this.accountService.register(request);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll(@currentUser() user:Account) {
    console.log("find all : ",user.id);
    return this.accountService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  
} 
