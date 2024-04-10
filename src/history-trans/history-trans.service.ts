import { Injectable } from '@nestjs/common';
import { CreateHistoryTranDto } from './dto/create-history-tran.dto';
import { UpdateHistoryTranDto } from './dto/update-history-tran.dto';

@Injectable()
export class HistoryTransService {
  create(createHistoryTranDto: CreateHistoryTranDto) {
    return 'This action adds a new historyTran';
  }

  findAll() {
    return `This action returns all historyTrans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyTran`;
  }

  update(id: number, updateHistoryTranDto: UpdateHistoryTranDto) {
    return `This action updates a #${id} historyTran`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyTran`;
  }
}
