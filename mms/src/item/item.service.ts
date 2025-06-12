import { Injectable, Inject } from '@nestjs/common';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { ITEM_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class ItemService {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private itemRepository: typeof Item,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.create({ ...createItemDto });
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.findAll({
      where: { isActive: true }
    });
  }

  async findOne(id: number): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id, isActive: true }
    });
  }

  async update(id: number, updateData: Partial<Item>): Promise<[number, Item[]]> {
    return this.itemRepository.update(updateData, {
      where: { id, isActive: true },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.itemRepository.update(
      { isActive: false },
      { where: { id, isActive: true } }
    ).then(([affectedCount]) => affectedCount);
  }
} 