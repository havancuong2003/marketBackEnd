
import { LoginDto, RegisterAccountDto } from './dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export interface  IAccountService {   
  update(id: number, updateAccountDto: UpdateAccountDto) ;
  findByUserName(name:string);
  login(requestsBody:LoginDto);
  register(requestsBody:RegisterAccountDto);
  findAll();
  findByEmail(email: string);
}
