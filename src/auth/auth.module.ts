import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Account, AccountModule, AccountService } from 'src/account';
import { DITokens } from 'src/di';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    AccountModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: DITokens.AuthService, useClass: AuthService },
    { provide: DITokens.AccountService, useClass: AccountService },
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
