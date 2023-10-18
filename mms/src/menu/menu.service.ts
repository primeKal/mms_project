import { Inject, Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';
import { MENU_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class MenuService {
    constructor(
        @Inject(MENU_REPOSITORY) private readonly menuRepository: typeof Menu,
    ) {

    }
    async getAllMenus(): Promise<Menu[]> {
        return await this.menuRepository.findAll<Menu>({
            //   include: { model: Socialmedia, as: 'socialmedias' }
        });
    }
    async createMenu(createMenuDto): Promise<any> {
        let menu = await this.menuRepository.create<Menu>(createMenuDto);
        return menu;
    }
    async getOneMenuById(id: number): Promise<Menu> {
        return await this.menuRepository.findOne({
            where: {
                id: id
            }
        })
    }
    async editMenu(editMenu: any): Promise<Menu> {
        var toEditMenu = await this.menuRepository.findByPk(editMenu.id);
        try {
            return await toEditMenu.update({ ...editMenu })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deleteMenu(id: string): Promise<void> {
        var toDeleteMenu = await this.menuRepository.findByPk(id);
        return await toDeleteMenu.destroy();
    }
    async getMenusByCompany(companyId: any): Promise<Menu> {
        return this.menuRepository.findOne({
            where: { companyId: companyId },
        })
    }
}
