import { currentUser } from 'src/decorator';
import { BadRequestException, Injectable } from '@nestjs/common';
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
  update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
  async findHeroOwnerByAccountId(idHero:number,account_id: UUID) {
    return await this.heroRepository
      .createQueryBuilder('hero')
      .where('hero.account_id = :idAcc', { idAcc: account_id })
      .andWhere('hero.id = :id',{id:idHero}).getOne();
  }
  async checkHeroOwner(id: number, account_id: UUID) {
    const hero = await this.findHeroOwnerByAccountId(id,account_id);
    console.log("Check Hero Owner: ",account_id)
    console.log(hero)
    if (!hero) {
      return {
        checkOwner: false
      }
    }else {
      return {
        checkOwner: true
      }
    }
  }
  findAll(): Promise<Hero[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  create(createHeroDto: CreateHeroDto) {
    const hero = this.heroRepository.create(createHeroDto);
    console.log('save hero: ', hero);
    return this.heroRepository.save(hero);
  }
  async updatePriceMarket(id: number, price: number,currentAccount:Account) { 
      const hero = await this.findHeroOwnerByAccountId(id, currentAccount.id);
      if(!hero){
        throw new BadRequestException('You don\'t have hero'); 
      }
      return this.heroRepository.update(id, { price: price });
  }
  async updateStatus(id: number, status: number,account_id: UUID) { 
    const hero = await this.findHeroOwnerByAccountId(id, account_id);
    if(!hero){
      throw new BadRequestException('You don\'t have hero'); 
    }
    return this.heroRepository.update(id, { status: status });
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
    queryBuilder.where('hero.status = :status', { status: 1 });
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
  // Hero đã sở hữu
  async searchHeroInventory(request: SearchHeroDto, idAccount: string) {
    console.log(request);
    const queryBuilder = this.heroRepository.createQueryBuilder('hero');
    queryBuilder.where('hero.account_id = :id', { id: idAccount });
    queryBuilder.andWhere('hero.status = :status', { status: 0 });

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
}
