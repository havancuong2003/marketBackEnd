import { CreateHistoryTranDto, UpdateHistoryTranDto } from "./dto";

export interface IHistoryTransService {
    create(createHistoryTranDto: CreateHistoryTranDto);
    findAll();
    findOne(id: number);
    update(id: number, updateHistoryTranDto: UpdateHistoryTranDto);
    remove(id: number);
}