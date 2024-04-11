import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { AccountService } from 'src/account/account.service';
import { DITokens } from 'src/di';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hero]),
  ],
  controllers: [HeroController],
  providers: [HeroService,{ provide : DITokens.HeroService, useClass: HeroService }],
})
export class HeroModule {}
