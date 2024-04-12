import { IHeroService } from './interface-hero.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Request, Query } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { DITokens } from 'src/di';
import { AuthGuard } from 'src/guard';
import { currentUser } from 'src/decorator';
import { SearchHeroDto } from './dto';
import { Account } from 'src/account';
import { Hero } from './entities';

@Controller("hero")
export class HeroController {
  
  constructor(@Inject(DITokens.HeroService) private  heroService: IHeroService) {}
  @Post("create")
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }
  @UseGuards(AuthGuard)
  @Get("inventory")
  showInventory(@currentUser() account:Account) {
    console.log("inventory: ",account.id);
    return this.heroService.showInventory(account.id);
  }
  @UseGuards(AuthGuard)
  @Get("listMarket")
  showListMarket(@currentUser() account:Account) {
    console.log("listMarket: ",account.id);
    return this.heroService.showListMarket(account.id);
  }
  @Post("/searchMarket")
  searchHeroMarket(@Body() request:SearchHeroDto) {
    return this.heroService.searchHeroMarket(request);
  }
  @UseGuards(AuthGuard)
  @Post("/searchInventory")
  searchHeroInventory(@Body() request:SearchHeroDto,@currentUser() account:Account) {
    return this.heroService.searchHeroInventory(request,account);
  }
  
  @Get('detail')
  detailHero(@Query("id") id: number) {
    return this.heroService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('statusHero')
  statusHero(@Body("hero_id") hero_id: number,@currentUser() account: Account) {
    return this.heroService.statusHero(hero_id,account);
  }
}
