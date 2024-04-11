import { CreateHeroDto, UpdateHeroDto } from "./dto";
import { Hero } from "./entities";

export interface IHeroService {
    findAll(): Promise<Hero[]>;
    findOne(id: number): Promise<Hero>;
    create(createHeroDto: CreateHeroDto): Promise<Hero>;
    update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero>;
    remove(id: number): Promise<Hero>;
}