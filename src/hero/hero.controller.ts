import { IHeroService } from './interface-hero.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Request,Query, ParseIntPipe } from '@nestjs/common';
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
  // @UseGuards(AuthGuard)
  // @Get("inventory")
  // showInventory(@currentUser() account:Account) {
  //   console.log("inventory: ",account.id);
  //   return this.heroService.showInventory(account.id);
  // }
  // @UseGuards(AuthGuard)
  // @Get("listMarket")
  // showListMarket(@currentUser() account:Account) {
  //   console.log("listMarket: ",account.id);
  //   return this.heroService.showListMarket(account.id);
  // }
  @Post("/listMarket")
  searchHeroMarket(@Body() request:SearchHeroDto) {
    return this.heroService.searchHeroMarket(request);
  }
  @UseGuards(AuthGuard)
  @Get("/checkOwner")
  checkOwner(@Query("id",ParseIntPipe) idHero: number, @currentUser() account:Account) {
    console.log("idHero",idHero)
    return this.heroService.checkHeroOwner(idHero,account);
  }
  @UseGuards(AuthGuard)
  @Post("/inventory")
  searchHeroInventory(@Body() request:SearchHeroDto,@currentUser() account:Account) {
    return this.heroService.searchHeroInventory(request,account);
  }

  @UseGuards(AuthGuard)
  @Post("updatePrice")
  updatePriceMarket(@Query("id",ParseIntPipe) id: number, @Body("price",ParseIntPipe) price: number,@currentUser() account:Account) {
    return this.heroService.updatePriceMarket(id, price,account);
  }
  
}
