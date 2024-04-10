import { Inject, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { DITokens } from 'src/di';
import { IAccountService } from 'src/account';

@Injectable()
export class HeroService {
  
 constructor(@Inject(DITokens.AccountService) accountService: IAccountService){}
}
