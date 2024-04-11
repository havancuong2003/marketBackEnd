import { UUID } from "crypto";
import { CreateHeroDto, SearchHeroDto, UpdateHeroDto } from "./dto";
import { Hero } from "./entities";
import { Account } from "src/account";

export interface IHeroService {
    findAll(): Promise<Hero[]>;
    findOne(id: number): Promise<Hero>;
    create(createHeroDto: CreateHeroDto): Promise<Hero>;
    update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero>;
    remove(id: number): Promise<Hero>;
    showInventory(account_id: UUID);
    showListMarket(account_id: UUID);
    searchHeroMarket(request:SearchHeroDto);
    searchHeroInventory(request: SearchHeroDto,account:Account);
}