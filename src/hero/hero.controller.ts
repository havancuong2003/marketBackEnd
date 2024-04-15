import { IHeroService } from './interface-hero.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards,Query, ParseIntPipe, Req } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { DITokens } from 'src/di';
import { AccessTokenGuard } from 'src/guard';
import { Account } from 'src/account';
import { currentUser } from 'src/decorator';
import { SearchHeroDto } from './dto';
import { Request } from 'express';
import { Hero } from './entities';

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
  @UseGuards(AccessTokenGuard)
  @Get("/checkOwner")
  checkOwner(@Query("id",ParseIntPipe) idHero: number,@Req()req:Request) {
    console.log("idHero",idHero)
    return this.heroService.checkHeroOwner(idHero,req.user['id']);
  }
  @UseGuards(AccessTokenGuard)
  @Post("/inventory")
  searchHeroInventory(@Body() requestBody:SearchHeroDto,@Req()req:Request) {
    console.log(req.user['id']);
    return this.heroService.searchHeroInventory(requestBody,req.user['id']);
  }

  @UseGuards(AccessTokenGuard)
  @Post("updatePrice")
  updatePriceMarket(@Query("id",ParseIntPipe) id: number, @Body("price",ParseIntPipe) price: number,@Req()req:Request) {
    return this.heroService.updatePriceMarket(id, price,req.user['id']);
  }
  
  @Get(':id/detail')
  detailHero(@Param('id') id: number) {
    return this.heroService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('statusHero')
  statusHero(@Body("hero_id") hero_id: number,@Req()req:Request  ) {
    return this.heroService.statusHero(hero_id,req.user['id']);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id/buy')
  buy(@Req() req:Request, @Param('id') id: number) {
    return this.heroService.buy(id, req.user['id']);
  }

  
}
