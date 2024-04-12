import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { IHeroService } from './interface-hero.service';
import { Hero } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { SearchHeroDto } from './dto';
import { Account } from 'src/account';

@Injectable()
export class HeroService implements IHeroService {
  constructor(
    @InjectRepository(Hero) private heroRepository: Repository<Hero>,
  ) {}
  findAll(): Promise<Hero[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: number): Promise<Hero> {
    return await this.heroRepository.findOneBy({ id });
  }
  create(createHeroDto: CreateHeroDto) {
    const hero = this.heroRepository.create(createHeroDto);
    console.log('save hero: ', hero);
    return this.heroRepository.save(hero);
  }
  
  update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
  async showInventory(account_id: UUID) {
    const heros = await this.heroRepository
      .createQueryBuilder('hero')
      .where('hero.account_id = :id', { id: account_id })
      .andWhere('hero.status = :status', { status: 0 })
      .getMany();
    return heros;
  }
  async showListMarket(account_id: UUID) {
    const heros = await this.heroRepository
      .createQueryBuilder('hero')
      .where('hero.account_id = :id', { id: account_id })
      .andWhere('hero.status = :status', { status: 1 })
      .getMany();
    return heros;
  }
  async searchHeroMarket(request: SearchHeroDto) {
    console.log(request);
    const queryBuilder = this.heroRepository.createQueryBuilder('hero');
    queryBuilder.where('hero.status = :status', { status: 1});
    // Kiểm tra nếu có rank được cung cấp
    if (request.rank) {
      queryBuilder.andWhere('hero.rank = :rank', { rank: request.rank });
    }

    // Kiểm tra nếu có race được cung cấp
    if (request.race) {
      queryBuilder.andWhere('hero.race = :race', { race: request.race });
    }

    // Kiểm tra nếu có class được cung cấp
    if (request.class) {
      queryBuilder.andWhere('hero.class = :class', { class: request.class });
    }

    const heros = await queryBuilder.getMany();
    return heros;
  }
  
  async searchHeroInventory(request: SearchHeroDto,account:Account){
    console.log(request);
    const queryBuilder = this.heroRepository.createQueryBuilder('hero');
    queryBuilder.where('hero.account_id = :id', { id: account.id });
    queryBuilder.andWhere('hero.status = :status', { status: 0});
    
    // Kiểm tra nếu có rank được cung cấp
    if (request.rank) {
      queryBuilder.andWhere('hero.rank = :rank', { rank: request.rank });
    }

    // Kiểm tra nếu có race được cung cấp
    if (request.race) {
      queryBuilder.andWhere('hero.race = :race', { race: request.race });
    }

    // Kiểm tra nếu có class được cung cấp
    if (request.class) {
      queryBuilder.andWhere('hero.class = :class', { class: request.class });
    }

    const heros = await queryBuilder.getMany();
    return heros;
  }
  remove(id: number): Promise<Hero> {
    throw new Error('Method not implemented.');
  }

  async statusHero(hero_id: number, account: Account)
  {
     const hero = await  this.findOne(hero_id);

    if(hero.account_id != account.id)
    {
      return{
        status: "Buy",
      }
    }
      return hero.status?{ status:"Delist" }:{ status:"Sell" }  
  }
}
