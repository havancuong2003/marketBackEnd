import { Inject, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { DITokens } from 'src/di';
import { IAccountService, UpdateAccountDto } from 'src/account';
import { IHeroService } from './interface-hero.service';
import { Hero } from './entities';

@Injectable()
export class HeroService implements IHeroService {
  
 constructor(){}
  findAll(): Promise<Hero[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
}
