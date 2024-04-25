import { IsNotEmpty } from "class-validator";
import { UUID } from "crypto";

export class ActivitySellHeroDto{
    @IsNotEmpty()
    value: number;


    @IsNotEmpty()
    account_id: UUID;

    @IsNotEmpty()
    opposite_user_id: UUID;

    @IsNotEmpty()
    hero_id: number;
}