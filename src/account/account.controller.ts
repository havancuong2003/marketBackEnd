import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';

import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccountService} from './interface-account.service';
import { DITokens } from 'src/di';

@Controller('account')
export class AccountController {
  constructor(@Inject(DITokens.AccountService)private readonly accountService: IAccountService) {}

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  
} 
