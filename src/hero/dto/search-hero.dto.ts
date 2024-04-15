import { Class, Race, Rank, SortInventory,SortMarket } from "src/constains";


export class SearchHeroDto{
    rank:Rank;
    race:Race;
    class:Class;
    sortInventory:SortInventory;
    sortMarket: SortMarket;
}