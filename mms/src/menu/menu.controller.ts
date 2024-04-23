import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { MenuDto } from './dtos/menu.dto';
import { ApiTags } from '@nestjs/swagger';


// @UseGuards(JwtAuthGuard)
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @Get()
  public async getMenu(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Menu[]> {
    return this.menuService.getAllMenus(page, pageSize);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getAMenu(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getOneMenuById(id);
  }

  @Get('ByCompany/:id')
  public async getMenuByCompany(@Param('id') id: number): Promise<Menu[]> {
    return this.menuService.getMenusByCompany(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createMenu(@Req() req: any, @Body() body: MenuDto): Promise<any> {
    return this.menuService.createMenu(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async editMenu(@Body() body: MenuDto): Promise<Menu> {

    return this.menuService.editMenu(body);
  }

  @Delete()
  public async deleteMenu(@Body() id): Promise<void> {
    return this.menuService.deleteMenu(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("ActivateMenu/:id")
  public async activateMenu(@Req() req: any, @Param('id') menuId: number): Promise<any> {
    return this.menuService.activateMenu(menuId, req.user.id);
  }

  @Get("GetActivateMenuByCompany/:id")
  public async getActiveMenuByCompany(@Param('id') companyId: number): Promise<any> {
    return this.menuService.getActiveMenuByCompany(companyId);
  }
}
