import { UUID } from "crypto";
import { CreateHeroDto, SearchHeroDto, UpdateHeroDto } from "./dto";
import { Hero } from "./entities";
import { Account } from "src/account";

export interface IHeroService {
    findAll(): Promise<Hero[]>;
    findOne(id: number);
    checkHeroOwner(id: number, account_id: UUID)
    create(createHeroDto: CreateHeroDto): Promise<Hero>;
    update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero>;
    remove(id: number): Promise<Hero>;
    showInventory(account_id: UUID);
    showListMarket(account_id: UUID);
    searchHeroMarket(request:SearchHeroDto);
    statusHero(hero_id: number, account: Account);
    findHeroOwnerByAccountId(idHero:number,account_id: UUID);
    updatePriceMarket(id: number, price: number,currentUser:Account);
    updateStatus(id: number, status: number,account_id: UUID)
    searchHeroInventory(request: SearchHeroDto, idAccount: string);
}