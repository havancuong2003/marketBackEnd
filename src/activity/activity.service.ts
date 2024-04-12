import { Activity } from 'src/activity/entities/activity.entity';
import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityService } from './interface-activity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService implements IActivityService {

  constructor( @InjectRepository(Activity) private activityRepository: Repository<Activity>) {}

  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
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

  async getActivities( account_id: string, event: string ) {
    const queryBuilder = this.activityRepository.createQueryBuilder('activity');
    queryBuilder.where('activity.account_id = :id', { id: account_id });
    if(event){
     queryBuilder.andWhere('activity.event = :event', { event: event });
    }
    queryBuilder.orderBy('activity.time', 'DESC');

    const activities = await queryBuilder.getMany();
    return activities;
  }
}
