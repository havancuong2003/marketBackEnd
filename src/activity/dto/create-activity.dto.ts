import { UUID } from "crypto";


export class CreateActivityDto {

    event: string;


    value: number;



    account_id: UUID;


    opposite_user_id?: UUID;


    hero_id: number;
}
