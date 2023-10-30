import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { tableProvider } from './table.provider';


@Module({
  controllers: [TableController],
  providers: [TableService, ...tableProvider]
})
export class TableModule {}
