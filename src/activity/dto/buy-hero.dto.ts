import { PartialType } from "@nestjs/mapped-types";
import { CreateActivityDto } from "./create-activity.dto";
import { UUID } from "crypto";
import { IsNotEmpty } from "class-validator";

export class ActivityBuyHeroDto {
    @IsNotEmpty()
    value: number;


    @IsNotEmpty()
    account_id: UUID;

    @IsNotEmpty()
    opposite_user_id: UUID;

    @IsNotEmpty()
    hero_id: number;
    
}