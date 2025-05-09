import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  public async getUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ): Promise<User[]> {
    return this.userService.getAllUsers(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  public async getAUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  public async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto
  ): Promise<User> {
    return this.userService.createUser(body, req.user.id);
  }

  @Put()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  public async editUser(
    @Req() req: any,
    @Body() body: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(body.id, body, req.user.id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  public async deleteUser(
    @Req() req: any,
    @Body() body: { id: number }
  ): Promise<void> {
    return this.userService.removeUser(body.id, req.user.id);
  }
}
