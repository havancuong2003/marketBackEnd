import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { IHeroService } from './interface-hero.service';
import { Hero } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { SearchHeroDto } from './dto';
import { Account, IAccountService } from 'src/account';
import { DITokens } from 'src/di';
import { Status } from 'src/constraint';
import { IHistoryTransService } from 'src/history-trans';
import { IActivityService } from 'src/activity';

@Injectable()
export class HeroService implements IHeroService {
  constructor(
    @InjectRepository(Hero) private heroRepository: Repository<Hero>,
    @Inject(DITokens.AccountService) private accountService: IAccountService,
    @Inject(DITokens.HistoryTransService)
    private historyTransService: IHistoryTransService,
    @Inject(DITokens.ActivityService)
    private readonly activityService: IActivityService,
  ) {}
  update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    throw new Error('Method not implemented.');
  }
  async findHeroOwnerByAccountId(idHero: number, account_id: UUID) {
    return await this.heroRepository
      .createQueryBuilder('hero')
      .where('hero.account_id = :idAcc', { idAcc: account_id })
      .andWhere('hero.id = :id', { id: idHero })
      .getOne();
  }
  async checkHeroOwner(id: number, account_id: UUID) {
    const hero = await this.findHeroOwnerByAccountId(id, account_id);
    console.log('Check Hero Owner: ', account_id);
    console.log(hero);
    if (!hero) {
      return {
        checkOwner: false,
      };
    } else {
      return {
        checkOwner: true,
      };
    }
  }
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
  async updatePriceMarket(id: number, price: number, account_id: UUID) {
    const hero = await this.findHeroOwnerByAccountId(id, account_id);

    if (!hero) {
      throw new BadRequestException("You don't have hero");
    }
    if (hero.status != 1) {
      throw new BadRequestException('You need sell hero to market');
    }
    return this.heroRepository.update(id, { price: price });
  }
  async updateStatus(id: number, status: number, account_id: UUID) {
    const hero = await this.findHeroOwnerByAccountId(id, account_id);
    if (!hero) {
      throw new BadRequestException("You don't have hero");
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
    const items_per_page = Number(request.items_per_page) || 5;
    const page = Number(request.page) || 1;
    const skip = (page - 1) * items_per_page;
    const queryBuilder = this.heroRepository.createQueryBuilder('hero');
    queryBuilder.where('hero.status = :status', { status: Status.MARKET });
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

    const [heros, total] = await queryBuilder
      .take(items_per_page)
      .skip(skip)
      .getManyAndCount();
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: heros,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }
  // Hero đã sở hữu
  async searchHeroInventory(request: SearchHeroDto, idAccount: string) {
    const items_per_page = Number(request.items_per_page) || 5;
    const page = Number(request.page) || 1;
    const skip = (page - 1) * items_per_page;
    const queryBuilder = this.heroRepository.createQueryBuilder('hero');
    queryBuilder.where('hero.account_id = :id', { id: idAccount });
    queryBuilder.andWhere('hero.status = :status', {
      status: Status.INVENTORY,
    });

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

    const [heros, total] = await queryBuilder
      .take(items_per_page)
      .skip(skip)
      .getManyAndCount();
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: heros,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }
  remove(id: number): Promise<Hero> {
    throw new Error('Method not implemented.');
  }

  async statusHero(hero_id: number, account: Account) {
    const hero = await this.findOne(hero_id);

    if (hero.account_id != account.id) {
      return {
        status: 'Buy',
      };
    }
    return hero.status ? { status: 'Delist' } : { status: 'Sell' };
  }

  async buy(heroId: number, accountId: UUID) {
    const account = await this.accountService.informationAccount(accountId);
    const hero = await this.findOne(heroId);
    console.log(account);
    console.log(hero);

    if (hero.status == Status.INVENTORY) {
      return { message: 'Hero Not Selling' };
    }
    if (account.money < hero.price) {
      return { message: 'Not enough money' };
    }

    account.balance = account.balance - hero.price;
    this.accountService.update(accountId, account);

    const seller = hero.account_id;
    const sellPrice = hero.price;

    hero.account_id = account.id;
    hero.status = Status.INVENTORY;
    hero.price = 0;
    this.heroRepository.update(heroId, hero);
    await this.activityService.createBuyHero({
      value: sellPrice,
      hero_id: heroId,
      account_id: accountId,
      opposite_user_id: seller,
    });
    await this.activityService.createSellHero({
      value: sellPrice,
      hero_id: heroId,
      account_id: seller,
      opposite_user_id: accountId,
    });

    // inset to historyTrans
    return this.historyTransService.create({
      value: sellPrice,
      seller: seller,
      buyer: account.id,
      hero_id: heroId,
    });
  }
}
