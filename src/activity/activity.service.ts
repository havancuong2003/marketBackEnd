import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityService } from './interface-activity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Event } from 'src/constains';

@Injectable()
export class ActivityService implements IActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>, 
  ) {}
   createListMarket(hero_id:number,account_id:UUID,value:number) {
     return this.activityRepository.createQueryBuilder().insert().into(Activity).values({hero_id:hero_id,account_id:account_id,value:value,event:Event.LIST}).execute();
     
  }
  createDelistMarket(hero_id:number,account_id:UUID) {
    return this.activityRepository.createQueryBuilder().insert().into(Activity).values({hero_id:hero_id,account_id:account_id,event:Event.DELIST}).execute();
    
 }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
