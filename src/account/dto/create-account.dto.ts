import { IsEmail, IsNotEmpty } from "class-validator";
import { UUID } from "crypto";

export class CreateAccountDto {
    
    id:UUID;

    @IsNotEmpty()
    username:string;
    
    @IsNotEmpty()
    password:string;

    @IsEmail()
    email:string;
}
