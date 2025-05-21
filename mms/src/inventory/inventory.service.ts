import { Injectable, Inject } from '@nestjs/common';
import { Inventory } from './inventory.entity';
import { Item } from '../item/item.entity';
import { Procurement } from '../procurement/procurement.entity';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY')
    private inventoryRepository: typeof Inventory,
  ) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.findAll({
      where: { isActive: true },
      include: [
        { model: Item },
        { model: Procurement }
      ]
    });
  }

  async findOne(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOne({
      where: { id, isActive: true },
      include: [
        { model: Item },
        { model: Procurement }
      ]
    });
  }

  async findByItem(itemId: number): Promise<Inventory[]> {
    return this.inventoryRepository.findAll({
      where: { itemId, isActive: true },
      include: [
        { model: Item },
        { model: Procurement }
      ]
    });
  }

  async updateStatus(id: number, status: string): Promise<[number, Inventory[]]> {
    return this.inventoryRepository.update(
      { status },
      {
        where: { id, isActive: true },
        returning: true,
      }
    );
  }

  async remove(id: number): Promise<number> {
    return this.inventoryRepository.update(
      { isActive: false },
      { where: { id, isActive: true } }
    ).then(([affectedCount]) => affectedCount);
  }
} 