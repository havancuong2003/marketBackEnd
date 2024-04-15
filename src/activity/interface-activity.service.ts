import { UUID } from "crypto";
import { CreateActivityDto, UpdateActivityDto } from "./dto";

export interface IActivityService {
    findAll();
    findOne(id: number);
    update(id: number, updateActivityDto: UpdateActivityDto);
    remove(id: number);
    createListMarket(hero_id:number,account_id:UUID,value:number)
    createDelistMarket(hero_id:number,account_id:UUID)
    getActivities(id:string,event:string);
}