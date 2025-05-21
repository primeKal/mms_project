import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { RoleDto } from './dtos/role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Role")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService){
    }
    
    @Get()
    public async getRole(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Role[]> {
      return this.roleService.getAllRoles(page, pageSize);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getARole(@Param('id') id: number): Promise<Role>{
      return this.roleService.getOneRoleById(id);
    }

    @Get('ByCompany/:id')
    public async getRoleByCompany(@Param('id') id: number): Promise<Role[]>{
      return this.roleService.getRolesByUser(id);
    }

    @Post()
    public async createRole(@Req() req: any,@Body() body: RoleDto): Promise<any> {
      return this.roleService.createRole(body);
    }

    @Put()
    public async editRole(@Body() body: RoleDto): Promise<Role> {

      return this.roleService.editRole(body);
    }

    @Delete()
    public async deleteRole(@Body() id): Promise<void>{
      return this.roleService.deleteRole(id.id);
    }
}
