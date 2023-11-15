import { Inject, Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';
import { MENU_REPOSITORY } from 'src/utils/constants';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { PaginationService } from 'src/utils/services/pagination.service';

@Injectable()
export class MenuService {
    constructor(
        @Inject(MENU_REPOSITORY) private readonly menuRepository: typeof Menu,
        private readonly paginationService : PaginationService<Menu>
    ) {
        this.paginationService = new PaginationService<Menu>(this.menuRepository);

    }
    async getAllMenus(page,pageSize): Promise<Menu[]> {
        let toInclude = [{
                    model: ProductCategory,
                    include: [{
                        model: Product,
                    }]
                 }]
        return await this.paginationService.findAll(page,pageSize, toInclude)
    }
    async createMenu(createMenuDto, companyId): Promise<any> {
        createMenuDto.companyId = companyId;
        let menu = await this.menuRepository.create<Menu>(createMenuDto);
        return menu;
    }
    async getOneMenuById(id: number): Promise<Menu> {
        return await this.menuRepository.findOne({
            where: {
                id: id
            },
            include: [{
                model: ProductCategory,
                include: [{
                    model: Product,
                }]
            }]
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
    async getMenusByCompany(companyId: any): Promise<Menu[]> {
        return this.menuRepository.findAll({
            where: { companyId: companyId },
        })
    }
    async activateMenu(menuId,companyId): Promise<Menu>{
        const menus = await this.menuRepository.findAll({
            where : { companyId  : companyId }
        })
        menus.forEach( async function (menu){
            let result = await menu.update({isActive: false})
            console.log(result)
            console.log('success');
        })
        const toActiveMenu = await this.menuRepository.findByPk(menuId);
        const updatedActiveMenu = toActiveMenu.update({
            isActive: true
        })
        return updatedActiveMenu
    }
}
