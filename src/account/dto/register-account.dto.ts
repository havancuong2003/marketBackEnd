import { PartialType } from "@nestjs/mapped-types";
import { CreateAccountDto } from "./create-account.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterAccountDto extends PartialType(CreateAccountDto) {
    @IsNotEmpty()
    @IsString()
    username: string;
 }