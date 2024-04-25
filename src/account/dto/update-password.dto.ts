import { IsNotEmpty } from "class-validator";

export class UpdatePasswordDto {
    
    @IsNotEmpty()
    curentpassword: string

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    repassword: string;
}