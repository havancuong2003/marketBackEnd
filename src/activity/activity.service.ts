import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { IActivityService } from './interface-activity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Event } from 'src/constains';
import { ActivityBuyHeroDto, ActivitySellHeroDto } from './dto';

@Injectable()
export class ActivityService implements IActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}
  async getActivities( event: string, account_id:UUID) {

    console.log(event)
    console.log(account_id)
    const queryBuilder = this.activityRepository.createQueryBuilder('activity');
    queryBuilder.where('activity.account_id = :id', { id: account_id });

    if(event){
     queryBuilder.andWhere('activity.event = :event', { event: event });
    }

    queryBuilder.orderBy('activity.time', 'DESC');

    const activities = await queryBuilder.getMany();
    return activities;
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
