import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityService } from './interface-activity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Event } from 'src/constains';
import { ActivityBuyHeroDto, ActivitySellHeroDto, SearchActivitiesDto } from './dto';

@Injectable()
export class ActivityService implements IActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}
  async getActivities( account_id:UUID,request:SearchActivitiesDto ) {
    const items_per_page = Number(request.items_per_page) || 10;
    const page = Number(request.page) || 1;
    const skip = (page - 1) * items_per_page;
    const queryBuilder = this.activityRepository.createQueryBuilder('activity');
    queryBuilder.where('activity.account_id = :id', { id: account_id });
    if(request.event === Event.SALE){
      queryBuilder.andWhere('activity.event = :event', {event: Event.SALE})
    }
    if(request.event === Event.PURCHASE){
      queryBuilder.andWhere('activity.event = :event', {event: Event.PURCHASE})
    }
    if(request.event === Event.LIST){
      queryBuilder.andWhere('activity.event = :event', {event: Event.LIST})
    }
    if(request.event === Event.DELIST){
      queryBuilder.andWhere('activity.event = :event', {event: Event.DELIST})
    }
    queryBuilder.orderBy('activity.time', 'DESC');
    const [activities, total] = await queryBuilder
      .take(items_per_page)
      .skip(skip)
      .getManyAndCount();
    console.log(total)
    return {
      records: activities,
      totalRecords:total
    };
  }
  createListMarket(hero_id: number, account_id: UUID, value: number) {
    return this.activityRepository
      .createQueryBuilder()
      .insert()
      .into(Activity)
      .values({
        hero_id: hero_id,
        account_id: account_id,
        value: value,
        event: Event.LIST,
      })
      .execute();
  }
  createDelistMarket(hero_id: number, account_id: UUID) {
    return this.activityRepository
      .createQueryBuilder()
      .insert()
      .into(Activity)
      .values({ hero_id: hero_id, account_id: account_id, event: Event.DELIST })
      .execute();
  }
  createBuyHero(activityBuyHeroDto: ActivityBuyHeroDto) {
    return this.activityRepository
      .createQueryBuilder()
      .insert()
      .into(Activity)
      .values({
        hero_id: activityBuyHeroDto.hero_id,
        account_id: activityBuyHeroDto.account_id,
        event: Event.PURCHASE,
        opposite_user_id:activityBuyHeroDto.opposite_user_id,
        value: activityBuyHeroDto.value,
      })
      .execute();
  }
  createSellHero(activitySellHeroDto:ActivitySellHeroDto) {
    return this.activityRepository
      .createQueryBuilder()
      .insert()
      .into(Activity)
      .values({
        hero_id: activitySellHeroDto.hero_id,
        account_id: activitySellHeroDto.account_id,
        event: Event.SALE,
        opposite_user_id:activitySellHeroDto.opposite_user_id,
        value: activitySellHeroDto.value,
      })
      .execute();
  }
}
