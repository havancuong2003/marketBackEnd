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
import { Class, Race, Rank, SortInventory, SortMarket, Status } from 'src/constains';
import { IHistoryTransService } from 'src/history-trans';
import { Activity, IActivityService } from 'src/activity';

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
    queryBuilder.innerJoin(Activity, 'activity', 'hero.id = activity.hero_id');
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
    if (request.sortMarket) {
      if (request.sortMarket === SortMarket.HIGHESTPRICE) {
        queryBuilder.orderBy('hero.price', 'ASC');
      } else if (request.sortMarket === SortMarket.LOWESTPRICE) {
        queryBuilder.orderBy('hero.price', 'DESC');
      } else if (request.sortMarket === SortMarket.RANKASC) {
        queryBuilder.orderBy('hero.rank', 'ASC');
      } else if (request.sortMarket === SortMarket.RANKDESC) {
        queryBuilder.orderBy('hero.rank', 'DESC');
      } else if (request.sortMarket === SortMarket.RECENTLY) {
        queryBuilder

          //.select('hero.*')
          .addSelect('MAX(activity.time)', 'max_time')
          .andWhere('hero.status = :status', { status: 1 })
          .andWhere('activity.event = :event', { event: 'LIST' })
          .groupBy('hero.id')
          .orderBy('max_time', 'DESC');
      }
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
    const items_per_page = Number(request.items_per_page) || 2;
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

    // Kiểm tra nếu có sort được cung cấp
    if (request.sortInventory) {
      if (request.sortInventory === SortInventory.PRICEASC) {
        queryBuilder.orderBy('hero.price', 'ASC');
      } else if (request.sortInventory === SortInventory.PRICEDESC) {
        queryBuilder.orderBy('hero.price', 'DESC');
      } else if (request.sortInventory === SortInventory.HIGHESTID) {
        queryBuilder.orderBy('hero.id', 'DESC');
      } else if (request.sortInventory === SortInventory.LOWESTID) {
        queryBuilder.orderBy('hero.id', 'ASC');
      } else if (request.sortInventory === SortInventory.RANKDESC) {
        queryBuilder.orderBy('hero.rank', 'DESC');
      } else if (request.sortInventory === SortInventory.RANKASC) {
        queryBuilder.orderBy('hero.rank', 'ASC');
      }
    }
    const [heros, total] = await queryBuilder
      .take(items_per_page)
      .skip(skip)
      .getManyAndCount();
    return {
      data: heros,
      totalItems:total,
      currentPage: page,
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

    if (hero.account_id === accountId) {

      throw new BadRequestException("You can't buy your hero");
    }

    if (hero.status == Status.INVENTORY) {
      throw new BadRequestException('You can not buy this hero');
    }
    if (account.balance < hero.price) {
      throw new BadRequestException('Not enough money');
    }

    account.balance = account.balance - hero.price;
    this.accountService.update(accountId, {balance:account.balance});
    const seller = hero.account_id;
    console.log(seller);
    const accountSeller = await this.accountService.informationAccount(seller);
    accountSeller.balance = accountSeller.balance + hero.price;
    await this.accountService.update(seller, {balance:accountSeller.balance});
    hero.account_id = account.id;
    hero.status = Status.INVENTORY;
    await this.heroRepository.update(heroId, {
      account_id: account.id,
      status: Status.INVENTORY,
    });
    await this.activityService.createBuyHero({
      value: hero.price,
      hero_id: heroId,
      account_id: accountId,
      opposite_user_id: seller,
    });
    await this.activityService.createSellHero({
      value: hero.price,
      hero_id: heroId,
      account_id: seller,
      opposite_user_id: accountId,
    });

    // inset to historyTrans
     await this.historyTransService.create({
      value: hero.price,
      seller: seller,
      buyer: account.id,
      hero_id: heroId,
    });
    return {
      message : 'Buy hero successfully'
    }
  }
}
