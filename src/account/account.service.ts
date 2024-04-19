import {
  BadRequestException,
  Inject,
  Injectable,
  Request,
} from '@nestjs/common';
import { IAccountService } from './interface-account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities';
import { Repository } from 'typeorm';

import { CreateAccountDto, UpdateAccountDto } from './dto';
import { UUID } from 'crypto';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  findAll() {
    return this.accountRepository.find();
  }
  findByUserName(name: string) {
    const user = this.accountRepository.findOneBy({ username: name });
    if (!user) throw new Error('user not found');
    return user;
  }
  findByEmail(email: string) {
    const user = this.accountRepository.findOneBy({ email: email });
    if (!user) throw new Error('user not found');
    return user;
  }
  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }
  async update(id: UUID, updateUserDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateUserDto);
  }
  create(create: CreateAccountDto) {
    return this.accountRepository.create(create);
  }
  save(account: Account) {
    return this.accountRepository.save(account);
  }
}
