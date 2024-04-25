import { UUID } from "crypto"

export class CreateHistoryTranDto {
    value: number
    seller: UUID
    buyer: UUID
    hero_id: number
}
