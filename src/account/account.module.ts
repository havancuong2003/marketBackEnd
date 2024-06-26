import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountService } from './account.service';
import { DITokens } from 'src/di';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService,
    { provide: DITokens.AccountService, useClass: AccountService }],
  controllers: [AccountController],
})
export class AccountModule {}
