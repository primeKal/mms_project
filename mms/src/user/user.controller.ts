import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsUserImg } from '../../multer.config';
import { UploadedFile, UseInterceptors } from '@nestjs/common';

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
  @Get('company')
  @ApiOperation({ summary: 'Get all users in the same company as the requester' })
  @ApiResponse({ status: 200, description: 'Return all users in the company.' })
  public async getUsersByCompany(@Req() req: any): Promise<User[]> {
    const user = req.user;
    console.log(user)
    if (!user.roles.some(role => role.name === 'Company')) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return this.userService.getUsersByCompany(user.company.id);
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
  @UseInterceptors(FileInterceptor('profileImage', multerOptionsUserImg))
  public async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @UploadedFile() profileImage?: Express.Multer.File
  ): Promise<User> {
    if (profileImage) {
      console.log("this is the profileImage", profileImage)
      body.profileImage = profileImage.path;
    }
    return this.userService.createUser(body, req.user.id);
  }

  // @Put()
  // @ApiOperation({ summary: 'Update a user' })
  // @ApiResponse({ status: 200, description: 'User successfully updated.' })
  // public async editUser(
  //   @Req() req: any,
  //   @Body() body: UpdateUserDto
  // ): Promise<User> {
  //   return this.userService.updateUser(body.id, body, req.user.id);
  // }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  public async deleteUser(
    @Req() req: any,
    @Body() body: { id: number }
  ): Promise<void> {
    return this.userService.removeUser(body.id, req.user.id);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @UseInterceptors(FileInterceptor('profileImage', multerOptionsUserImg))
  public async updateUserById(
    @Param('id') id: number,
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @UploadedFile() profileImage?: Express.Multer.File
  ): Promise<User> {
    const user = req.user;
    // Allow if user is updating themselves or has Company role
    if (user.id !== Number(id) && !user.roles.some(role => role.name === 'Company')) {
      throw new ForbiddenException('Insufficient permissions');
    }
    if (profileImage) {
      body.profileImage = profileImage.path;
    }
    return this.userService.updateUserByCompanyOrSelf(id, body, user);
  }
}
