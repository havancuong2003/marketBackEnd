import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryTransService } from './history-trans.service';
import { CreateHistoryTranDto } from './dto/create-history-tran.dto';
import { UpdateHistoryTranDto } from './dto/update-history-tran.dto';

@Controller('history-trans')
export class HistoryTransController {
  constructor(private readonly historyTransService: HistoryTransService) {}

  @Post()
  create(@Body() createHistoryTranDto: CreateHistoryTranDto) {
    return this.historyTransService.create(createHistoryTranDto);
  }

  @Get()
  findAll() {
    return this.historyTransService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyTransService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryTranDto: UpdateHistoryTranDto) {
    return this.historyTransService.update(+id, updateHistoryTranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyTransService.remove(+id);
  }
}
