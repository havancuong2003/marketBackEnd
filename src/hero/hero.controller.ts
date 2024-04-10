import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { IAccountService } from 'src/account';

@Controller('hero')
export class HeroController {
  constructor() {}
}
