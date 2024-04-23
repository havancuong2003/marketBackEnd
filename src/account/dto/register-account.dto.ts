import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAccountDto extends PartialType(CreateAccountDto) {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsEmpty()
  balance: number;
}
