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
    @InjectRepository(HistoryTran)
    private historyTranRepository: Repository<HistoryTran>,
  ) {}

  create(createHistoryTranDto: CreateHistoryTranDto) {
    return this.historyTranRepository.save(createHistoryTranDto);
  }

  findAll() {
    return `This action returns all historyTrans`;
  }

  findOne(id: number) {
    console.log('find one');
    return `This action returns a #${id} historyTran`;
  }

  update(id: number, updateHistoryTranDto: UpdateHistoryTranDto) {
    return `This action updates a #${id} historyTran`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyTran`;
  }

  async getTopTrans(id: number, page: number) {
    const items_per_page = 8;
    console.log('page: ', page);
    if (page === undefined) page = 1;
    const skip = (page - 1) * items_per_page;
    const queryBuilder =
      this.historyTranRepository.createQueryBuilder('historyTran');
    queryBuilder.where('historyTran.hero_id = :id', { id: id });
    queryBuilder.orderBy('historyTran.time', 'DESC');
    //queryBuilder.limit(5);

    const [trans, total] = await queryBuilder
      .take(items_per_page)
      .skip(skip)
      .getManyAndCount();
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return { data: trans, total, curPage: page, nextPage, prevPage, lastPage };
  }
}
