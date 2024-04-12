import { CreateActivityDto } from './../activity/dto/create-activity.dto';
import { IHeroService } from './interface-hero.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  Query,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { DITokens } from 'src/di';
import { AccessTokenGuard } from 'src/guard';
import { Account, CreateAccountDto } from 'src/account';
import { currentUser } from 'src/decorator';
import { SearchHeroDto } from './dto';
import { Request } from 'express';
import {  IActivityService } from 'src/activity';
import { Event } from 'src/constains';

@Controller('hero')
export class HeroController {
  constructor(
    @Inject(DITokens.HeroService) private heroService: IHeroService,
    @Inject(DITokens.ActivityService)
    private readonly activityService: IActivityService,
  ) {}
  @Post('create')
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
  @Post('/list-market')
  searchHeroMarket(@Body() request: SearchHeroDto) {
    return this.heroService.searchHeroMarket(request);
  }
  @UseGuards(AccessTokenGuard)
  @Get('/check-owner')
  checkOwner(@Query('id', ParseIntPipe) idHero: number, @Req() req: Request) {
    console.log('id-hero', idHero);
    return this.heroService.checkHeroOwner(idHero, req.user['id']);
  }
  @UseGuards(AccessTokenGuard)
  @Get('/inventory')
  searchHeroInventory(@Param() requestBody: SearchHeroDto, @Req() req: Request) {
    return this.heroService.searchHeroInventory(requestBody, req.user['id']);
  }
  @UseGuards(AccessTokenGuard)
  @Patch('update-price')
  async updatePriceMarket(
    @Query('id', ParseIntPipe) id: number,
    @Body('price', ParseIntPipe) price: number,
    @Req() req: Request,
  ) {
    return this.heroService.updatePriceMarket(id, price, req.user['id']);
  }
  @UseGuards(AccessTokenGuard)
  @Patch(':id/selling')
  async updateStatusSell(
    @Param('id', ParseIntPipe) id: number,
    @Body('price', ParseIntPipe) price: number,
    @Req() req: Request,
  ) {
    console.log(id);
    const userId = req.user['id']
    await this.heroService.updateStatus(id, 1,userId); 
    // wait status change to 1
    await this.heroService.updatePriceMarket(id, price, userId); 

    const createActivityDto = new CreateActivityDto();
    return this.activityService.createListMarket(id,userId,price)
    
  }
  @UseGuards(AccessTokenGuard)
  @Patch(':id/delist')
  async updateDelist(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const userId = req.user['id']
     await this.heroService.updateStatus(id, 0, userId);
     return this.activityService.createDelistMarket(id,userId)
  }
}
