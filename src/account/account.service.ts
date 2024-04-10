import { Injectable } from "@nestjs/common";
import {  IAccountService } from "./interface-account.service";
import { UpdateAccountDto } from "./dto";
@Injectable()
export class AccountService implements IAccountService{
    update(id: number, updateAccountDto: UpdateAccountDto) {
        throw new Error("Method not implemented.");
    }
    findByUserName(name: string) {
        throw new Error("Method not implemented.");
    }
    
}