
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities';



export interface  IAccountService {   
  update(id: number, updateAccountDto: UpdateAccountDto) ;
  findByUserName(name:string);
}
