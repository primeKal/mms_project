import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from 'src/utils/constants';
import { Role } from './role.entity';
import { Op } from 'sequelize';

@Injectable()
export class RoleService {
    constructor(
        @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,
    ) {
    }
    async getAllRoles(page,pageSize): Promise<Role[]> {
        return await this.roleRepository.findAll()
    }
    async createRole(createRoleDto): Promise<any> {
        let role = await this.roleRepository.create<Role>(createRoleDto);
        return role;
    }
    async getOneRoleById(id: number): Promise<Role> {
        return await this.roleRepository.findOne({
            where: {
                id: id
            }
        })
    }
    async editRole(editRole: any): Promise<Role> {
        var toEditRole = await this.roleRepository.findByPk(editRole.id);
        try {
            return await toEditRole.update({ ...editRole })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deleteRole(id: string): Promise<void> {
        var toDeleteRole = await this.roleRepository.findByPk(id);
        return await toDeleteRole.destroy();
    }
    async getRolesByUser(userId: any): Promise<Role[]> {
        return this.roleRepository.findAll({
            where: { users: { [Op.in]: userId } },
        })
    }



}
