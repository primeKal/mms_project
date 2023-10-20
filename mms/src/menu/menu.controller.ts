import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { MenuDto } from './dtos/menu.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService){
    }
    
    @Get()
    public async getMenu(): Promise<Menu[]> {
      return this.menuService.getAllMenus();
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getAMenu(@Param('id') id: number): Promise<Menu>{
      return this.menuService.getOneMenuById(id);
    }

    @Get('ByCompany/:id')
    public async getMenuByCompany(@Param('id') id: number): Promise<Menu>{
      return this.menuService.getMenusByCompany(id);
    }

    @Post()
    public async createMenu(@Body() body: MenuDto): Promise<any> {
      return this.menuService.createMenu(body);
    }

    @Put()
    public async editMenu(@Body() body: MenuDto): Promise<Menu> {

      return this.menuService.editMenu(body);
    }

    @Delete()
    public async deleteMenu(@Body() id): Promise<void>{
      return this.menuService.deleteMenu(id);
    }
}