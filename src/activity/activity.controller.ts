import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityService } from './interface-activity.service';
import { DITokens } from 'src/di';
import { Activity } from './entities';
import { } from 'src/guard';

@Controller('activity')
export class ActivityController {
  constructor( @Inject(DITokens.ActivityService) private readonly activityService: IActivityService ) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }

 // @UseGuards(AuthGuard)
  @Post('getActivites')
  getActivites( @Body() activity : Activity ) {
    return this.activityService.getActivities(activity.account_id, activity.event);
  }
}
