import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseGuards, Req } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AccessTokenGuard } from 'src/guard';
import { Request } from 'express';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  
  @UseGuards(AccessTokenGuard)
  @Get()
  getActivity(@Query() search, @Req() req: Request  ) {
    return this.activityService.getActivities(  req.user['id'],search);
  }


 // @UseGuards(AuthGuard)
  // @UseGuards(AccessTokenGuard)
  // @Get()
  // getActivityByEvent( @Param('event') event: string, @Req() req: Request ) {
  //   return this.activityService.getActivities( event, req.user['id']);
  // }
}
