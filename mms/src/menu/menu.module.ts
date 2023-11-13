import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import {  menuProvider } from './menu.provider';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  providers: [MenuService, ...menuProvider, PaginationService],
  controllers: [MenuController]
})
export class MenuModule {}
