import { IS_STRING, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}