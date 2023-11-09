import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { tableProvider } from './table.provider';
import { PaginationService } from 'src/utils/services/pagination.service';


@Module({
  controllers: [TableController],
  providers: [TableService, ...tableProvider, PaginationService]
})
export class TableModule {}
