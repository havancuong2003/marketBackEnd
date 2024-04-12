import { UUID } from "crypto";
import { CreateHeroDto, SearchHeroDto, UpdateHeroDto } from "./dto";
import { Hero } from "./entities";
import { Account } from "src/account";

export interface IHeroService {
    findAll(): Promise<Hero[]>;
    checkHeroOwner(id: number, account: Account)
    create(createHeroDto: CreateHeroDto): Promise<Hero>;
    update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero>;
    remove(id: number): Promise<Hero>;
    showInventory(account_id: UUID);
    showListMarket(account_id: UUID);
    searchHeroMarket(request:SearchHeroDto);
    searchHeroInventory(request: SearchHeroDto,account:Account);
    findHeroOwnerByAccountId(idHero:number,account_id: UUID);
    updatePriceMarket(id: number, price: number,currentUser:Account);
    updateStatus(id: number, status: number,currentAccount:Account); 
}