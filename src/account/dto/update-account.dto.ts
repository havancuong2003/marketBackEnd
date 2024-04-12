import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { UUID } from 'crypto';

export class UpdateAccountDto {
    id?:UUID;

    username?:string;
    
    password?:string;

    email?:string;

    refresh_token?: string;
}
