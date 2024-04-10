import { Module } from '@nestjs/common';
import { HistoryTransService } from './history-trans.service';
import { HistoryTransController } from './history-trans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryTran } from './entities/history-tran.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryTran]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [HistoryTransController],
  providers: [HistoryTransService],
})
export class HistoryTransModule {}
