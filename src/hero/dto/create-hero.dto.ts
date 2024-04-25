import { UUID } from "crypto";
import { Class, Race, Rank } from "src/constains";


export class CreateHeroDto {
    id:number;
    name:string;
    rank:Rank;
    race:Race;
    class:Class;
    power:number;
    hp:number;
    speed:number;
    dps:number;
    status:number;
    price:number;
    account_id:UUID;


}
