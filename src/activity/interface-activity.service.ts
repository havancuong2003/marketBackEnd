import { UUID } from "crypto";
import { CreateActivityDto, SearchActivitiesDto, UpdateActivityDto } from "./dto";
import { ActivityBuyHeroDto } from "./dto/buy-hero.dto";
import { ActivitySellHeroDto } from "./dto/sell-hero.dto";

export interface IActivityService {
    createListMarket(hero_id:number,account_id:UUID,value:number)
    createDelistMarket(hero_id:number,account_id:UUID)
    createBuyHero(activityBuyHeroDto: ActivityBuyHeroDto)
    createSellHero(activitySellHeroDto:ActivitySellHeroDto) 
    getActivities( account_id:UUID,request:SearchActivitiesDto);
}