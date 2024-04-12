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
import * as bcrypt from 'bcrypt';
import { RegisterAccountDto, UpdateAccountDto } from './dto';
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
  async findByUserName(name: string) {
    const user = await this.accountRepository.findOneBy({ username: name });
    if (!user) throw new Error('user not found');
    return user;
  }
  async findByEmail(email: string) {
    const user =  await this.accountRepository.findOneBy({ email: email });
    if (!user) throw new Error('user not found');
    return user;
  }
  async updatePassWord(id: UUID, password: string) {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    return this.accountRepository.update(id, { password: passwordHash });
  }
  async update(id: UUID, updateUserDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateUserDto);
  }
  create(create:RegisterAccountDto){
    return this.accountRepository.create(create);
  }
  save(account:Account){
    return this.accountRepository.save(account);
  }
  informationAccount(id:UUID){
    return this.accountRepository.findOneBy({ id: id });
  }
  async updateUserName(id:UUID,username:string){
    const user = await this.accountRepository.findOneBy({ username: username });
    console.log("updateUserName ",username);
    console.log("updateUserName ",user);
    if(user){
      throw new BadRequestException('username already exist');
    }
    return this.accountRepository.update(id,{username:username});

  }
}
