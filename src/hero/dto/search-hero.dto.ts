import { IsAlpha, IsInt, Length, Min } from "class-validator";
import { Class, Race, Rank } from "src/constains";


export class SearchHeroDto{
    rank:Rank;
    race:Race;
    class:Class;
    page:number;
    items_per_page:number;
}