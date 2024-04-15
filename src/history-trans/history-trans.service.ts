import { Injectable } from '@nestjs/common';
import { CreateHistoryTranDto } from './dto/create-history-tran.dto';
import { UpdateHistoryTranDto } from './dto/update-history-tran.dto';
import { HistoryTran } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IHistoryTransService } from './interface-history-trans.service';

@Injectable()
export class HistoryTransService implements IHistoryTransService {
  constructor(
    @InjectRepository(HistoryTran) private historyTranRepository: Repository<HistoryTran>,
  ){};

  create(createHistoryTranDto: CreateHistoryTranDto) {
    return this.historyTranRepository.save(createHistoryTranDto);
  }

  findAll() {
    return `This action returns all historyTrans`;
  }

  findOne(id: number) {
    console.log("find one");
    return `This action returns a #${id} historyTran`;
  }

  update(id: number, updateHistoryTranDto: UpdateHistoryTranDto) {
    return `This action updates a #${id} historyTran`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyTran`;
  }

  async getTopTrans(id:number){
    console.log(id);
    const queryBuilder = this.historyTranRepository.createQueryBuilder('historyTran');
    queryBuilder.where('historyTran.hero_id = :id', { id: id });
    queryBuilder.orderBy('historyTran.time', 'DESC');
    queryBuilder.limit(5);
    
    const trans = await queryBuilder.getMany();
    return trans;

  }

}
