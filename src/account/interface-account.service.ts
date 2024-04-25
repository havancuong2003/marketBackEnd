import { UUID } from 'crypto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { RegisterAccountDto } from './dto';
import { Account } from './entities';
export interface IAccountService {
  findByUserName(name: string);
  findAll();
  findByEmail(email: string);
  update(id: UUID, updateUserDto: UpdateAccountDto);
  create(create: RegisterAccountDto);
  save(account: Account);
  informationAccount(id: UUID);
  updateAvatar(id: UUID, avatar: string);
  updateUserName(id: UUID, username: string);
  updatePassWord(id: UUID, password: string, currentPassword: string);
  findByEmailRegister(email: string);
  findByUserNameRegister(email: string);
}
