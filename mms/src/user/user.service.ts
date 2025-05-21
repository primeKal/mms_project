import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'src/utils/constants';
import { User } from './entities/user.entity';
import { PaginationService } from 'src/utils/services/pagination.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly paginationService: PaginationService<User>
  ) {
    this.paginationService = new PaginationService<User>(this.userRepository);
  }

  async getAllUsers(page: number, pageSize: number): Promise<User[]> {
    return await this.paginationService.findAll(page, pageSize);
  }

  async createUser(createUserDto: CreateUserDto, creatorId: number): Promise<User> {
    if (creatorId !== 0) {
      const creator = await this.userRepository.findByPk(creatorId, {
        include: ['roles'],
      });

      if (!creator) {
        throw new Error('Creator user not found');
      }

      const hasAdminRole = creator.roles.some(role => role.name === 'Company');
      if (!hasAdminRole) {
        throw new Error('Insufficient permissions to create users');
      }
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create<User>({
      ...createUserDto,
      password: hashedPassword,
    });

    if (createUserDto.roleIds) {
      await user.$set('roles', createUserDto.roleIds);
    }

    return this.findOne(user.id);
  }

  async createSystemUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create<User>({
      ...createUserDto,
      password: hashedPassword,
    });

    if (createUserDto.roleIds) {
      await user.$set('roles', createUserDto.roleIds);
    }

    return this.findOne(user.id);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id, {
      include: ['roles', 'company'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      include: ['roles', 'company'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: ['roles', 'company'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, updaterId: number): Promise<User> {
    const updater = await this.userRepository.findByPk(updaterId, {
      include: ['roles'],
    });

    if (!updater) {
      throw new Error('Updater user not found');
    }

    const hasAdminRole = updater.roles.some(role => role.name === 'admin');
    if (!hasAdminRole) {
      throw new Error('Insufficient permissions to update users');
    }

    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update(updateUserDto);

    if (updateUserDto.roleIds) {
      await user.$set('roles', updateUserDto.roleIds);
    }

    return this.findOne(id);
  }

  async removeUser(id: number, removerId: number): Promise<void> {
    const remover = await this.userRepository.findByPk(removerId, {
      include: ['roles'],
    });

    if (!remover) {
      throw new Error('Remover user not found');
    }

    const hasAdminRole = remover.roles.some(role => role.name === 'admin');
    if (!hasAdminRole) {
      throw new Error('Insufficient permissions to delete users');
    }

    const user = await this.findOne(id);
    await user.destroy();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async getUsersByCompany(companyId: number): Promise<User[]> {
    console.log(companyId)
    console.log("this is the user repository", companyId)
    return await this.userRepository.findAll({
      where: { "companyId": companyId },
      include: ['roles'],
    });
  }

  async updateUserByCompanyOrSelf(id: number, updateUserDto: UpdateUserDto, currentUser: any): Promise<User> {
    const user = await this.findOne(id);
    // Only allow if same company
    if (user.companyId !== currentUser.company.id) {
      throw new Error('Cannot update user from another company');
    }
    // Only allow if self or has Company role
    const isSelf = currentUser.id === user.id;
    const isCompanyAdmin = currentUser.roles.some(role => role.name === 'Company');
    if (!isSelf && !isCompanyAdmin) {
      throw new Error('Insufficient permissions to update user');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    console.log("this is the updateUserDto", updateUserDto)
    updateUserDto.companyId = user.company.id 
    console.log("this is the currentUser", currentUser)
    await user.update(updateUserDto);
    if (updateUserDto.roleIds && isCompanyAdmin) {
      await user.$set('roles', updateUserDto.roleIds);
    }
    return this.findOne(id);
  }
}
