import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import {  menuProvider } from './menu.provider';

@Module({
  providers: [MenuService, ...menuProvider],
  controllers: [MenuController]
})
export class MenuModule {}
