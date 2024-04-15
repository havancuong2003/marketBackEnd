import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseGuards, Req } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityService } from './interface-activity.service';
import { DITokens } from 'src/di';
import { Activity } from './entities';
import { AccessTokenGuard } from 'src/guard';
import { Request } from 'express';

@Controller('activity')
export class ActivityController {
  constructor( @Inject(DITokens.ActivityService) private readonly activityService: IActivityService ) {}

 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
  
  @UseGuards(AccessTokenGuard)
  @Get()
  getActivity(@Param('event') event: string, @Req() req: Request ) {
    return this.activityService.getActivities( event, req.user['id']);
  }


 // @UseGuards(AuthGuard)
  @UseGuards(AccessTokenGuard)
  @Get(':event')
  getActivityByEvent( @Param('event') event: string, @Req() req: Request ) {
    return this.activityService.getActivities( event, req.user['id']);
  }
}
