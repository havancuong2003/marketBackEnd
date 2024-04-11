import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { DITokens } from 'src/di';
import { AuthGuard } from 'src/guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),],
  providers: [{ provide : DITokens.AccountService, useClass: AccountService },JwtService],
  controllers: [AccountController],
})
export class AccountModule {}
