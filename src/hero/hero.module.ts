import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { DITokens } from 'src/di';
import { Account, AccountService } from 'src/account';

@Module({
  imports: [TypeOrmModule.forFeature([Hero, Account])],
  controllers: [HeroController],
  providers: [
    HeroService,
    { provide: DITokens.HeroService, useClass: HeroService },
    { provide: DITokens.AccountService, useClass: AccountService },
  ],
})
export class HeroModule {}
