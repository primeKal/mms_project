import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Kitchen } from './entities/kitchen.entity';
import { ItemCount, ItemRequestStatus } from './entities/item-count.entity';
import { KitchenPayload } from './entities/kitchen-payload.entity';
import { CreateKitchenDto, AddItemsToKitchenDto, RegisterPayloadDto, UpdateKitchenDto } from './dtos/kitchen.dtos';
import { PaginationService } from '../utils/services/pagination.service';
import { Transaction } from 'sequelize';
import { ItemService } from '../item/item.service';
import { Item } from '../item/item.entity';
import { KITCHEN_REPOSITORY, ITEM_COUNT_REPOSITORY, KITCHEN_PAYLOAD_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class KitchenService {
  constructor(
    @Inject(KITCHEN_REPOSITORY)
    private kitchenRepository: typeof Kitchen,
    @Inject(ITEM_COUNT_REPOSITORY)
    private itemCountRepository: typeof ItemCount,
    @Inject(KITCHEN_PAYLOAD_REPOSITORY)
    private kitchenPayloadRepository: typeof KitchenPayload,
    private readonly itemService: ItemService,
    private readonly paginationService: PaginationService<Kitchen>
  ) {
    this.paginationService = new PaginationService<Kitchen>(this.kitchenRepository);
  }

  async create(createKitchenDto: CreateKitchenDto, companyId: number): Promise<Kitchen> {
    return this.kitchenRepository.create({ ...createKitchenDto, companyId: companyId });
  }

  async findAll(page: number, pageSize: number): Promise<Kitchen[]> {
    return this.paginationService.findAll(page, pageSize, [
      { model: ItemCount, include: [{ model: Item }] },
      { model: KitchenPayload }
    ]);
  }

  async findOne(id: number): Promise<Kitchen> {
    const kitchen = await this.kitchenRepository.findOne({
      where: { id, isActive: true },
      include: [
        { model: ItemCount, include: [{ model: Item }] },
        { model: KitchenPayload }
      ]
    });

    if (!kitchen) {
      throw new BadRequestException('Kitchen not found');
    }

    return kitchen;
  }

  async update(id: number, updateKitchenDto: UpdateKitchenDto): Promise<[number, Kitchen[]]> {
    return this.kitchenRepository.update(updateKitchenDto, {
      where: { id, isActive: true },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.kitchenRepository.update(
      { isActive: false },
      { where: { id, isActive: true } }
    ).then(([affectedCount]) => affectedCount);
  }

  async addItems(kitchenId: number, addItemsDto: AddItemsToKitchenDto): Promise<ItemCount[]> {
    const kitchen = await this.findOne(kitchenId);
    
    // Verify all items exist using ItemService
    const items = await Promise.all(
      addItemsDto.items.map(item => this.itemService.findOne(item.itemId))
    );

    if (items.some(item => !item)) {
      throw new BadRequestException('One or more items not found');
    }

    const itemCounts = await Promise.all(
      addItemsDto.items.map(async (item) => {
        const [itemCount, created] = await this.itemCountRepository.findOrCreate({
          where: { 
            kitchenId,
            itemId: item.itemId,
            status: ItemRequestStatus.REQUESTED
          },
          defaults: {
            count: item.count,
            status: ItemRequestStatus.REQUESTED
          }
        });

        if (!created) {
          itemCount.count += item.count;
          itemCount.status = ItemRequestStatus.REQUESTED;
          await itemCount.save();
        }

        return itemCount;
      })
    );

    return itemCounts;
  }

  async clearKitchen(kitchenId: number): Promise<void> {
    const kitchen = await this.findOne(kitchenId);
    await this.itemCountRepository.destroy({
      where: { kitchenId }
    });
  }

  async registerPayload(kitchenId: number, registerPayloadDto: RegisterPayloadDto): Promise<KitchenPayload> {
    const kitchen = await this.findOne(kitchenId);

    if (registerPayloadDto.clearItems) {
      await this.clearKitchen(kitchenId);
    }

    return this.kitchenPayloadRepository.create({
      kitchenId,
      comment: registerPayloadDto.comment,
      payload: registerPayloadDto.payload
    });
  }

  async getKitchenHistory(kitchenId: number, page: number, pageSize: number): Promise<KitchenPayload[]> {
    const kitchen = await this.findOne(kitchenId);
    return this.kitchenPayloadRepository.findAll({
      where: { kitchenId },
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
  }

  async getKitchenItems(kitchenId: number): Promise<ItemCount[]> {
    const kitchen = await this.findOne(kitchenId);
    return this.itemCountRepository.findAll({
      where: { kitchenId },
      include: [{ model: Item }]
    });
  }

  async getPendingItemRequests(page: number = 1, pageSize: number = 10): Promise<ItemCount[]> {
    return this.itemCountRepository.findAll({
      where: {
        status: ItemRequestStatus.REQUESTED
      },
      include: [
        { model: Kitchen },
        { model: Item }
      ],
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
  }

  async approveItemRequest(requestId: number): Promise<ItemCount> {
    const request = await this.itemCountRepository.findOne({
      where: {
        id: requestId,
        status: ItemRequestStatus.REQUESTED
      }
    });

    if (!request) {
      throw new BadRequestException('Item request not found or already processed');
    }

    request.status = ItemRequestStatus.APPROVED;
    return request.save();
  }

  async disapproveItemRequest(requestId: number): Promise<ItemCount> {
    const request = await this.itemCountRepository.findOne({
      where: {
        id: requestId,
        status: ItemRequestStatus.REQUESTED
      }
    });

    if (!request) {
      throw new BadRequestException('Item request not found or already processed');
    }

    request.status = ItemRequestStatus.DISAPPROVED;
    return request.save();
  }
}