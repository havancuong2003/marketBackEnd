import { IHeroService } from './interface-hero.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Request } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { DITokens } from 'src/di';
import { AuthGuard } from 'src/guard';
import { Account } from 'src/account';
import { currentUser } from 'src/decorator';
import { SearchHeroDto } from './dto';

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
  
}
