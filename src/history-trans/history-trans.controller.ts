import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { HistoryTransService } from './history-trans.service';
import { CreateHistoryTranDto } from './dto/create-history-tran.dto';
import { UpdateHistoryTranDto } from './dto/update-history-tran.dto';
import { IHistoryTransService } from './interface-history-trans.service';
import { DITokens } from 'src/di';

@Controller('history-trans')
export class HistoryTransController {
  constructor( @Inject(DITokens.HistoryTransService) private readonly historyTransService: IHistoryTransService) {}

  @Post()
  create(@Body() createHistoryTranDto: CreateHistoryTranDto) {
    return this.historyTransService.create(createHistoryTranDto);
  }  
  @Get(":id/top-trans")
  async getTopTrans(@Param('id') id: number) {
    return await this.historyTransService.getTopTrans(id);
  }
}
