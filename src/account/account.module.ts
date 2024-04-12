
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountService } from './account.service';
import { DITokens } from 'src/di';
import { MailService } from 'src/mail';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '500s' },
    }),
  ],
  providers: [
    AccountService,
    { provide: DITokens.MailService, useClass: MailService },
    { provide: DITokens.AccountService, useClass: AccountService },
  ],
  controllers: [AccountController],
})
export class AccountModule {}
 