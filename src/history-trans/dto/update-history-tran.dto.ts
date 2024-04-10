import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryTranDto } from './create-history-tran.dto';

export class UpdateHistoryTranDto extends PartialType(CreateHistoryTranDto) {}
