import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Procurement } from './procurement.entity';
import { CreateProcurementDto } from './dtos/create-procurement.dto';
import { UpdateProcurementStatusDto } from './dtos/update-procurement-status.dto';
import { Inventory } from '../inventory/inventory.entity';
import { Item } from '../item/item.entity';

@Injectable()
export class ProcurementService {
  constructor(
    @Inject('PROCUREMENT_REPOSITORY')
    private procurementRepository: typeof Procurement,
    @Inject('INVENTORY_REPOSITORY')
    private inventoryRepository: typeof Inventory,
  ) {}

  async create(createProcurementDto: CreateProcurementDto): Promise<Procurement> {
    return this.procurementRepository.create({ 
      ...createProcurementDto,
      status: 'PENDING'
    });
  }

  async findAll(): Promise<Procurement[]> {
    return this.procurementRepository.findAll({
      where: { isActive: true },
      include: [{ model: Item }]
    });
  }

  async findOne(id: number): Promise<Procurement> {
    return this.procurementRepository.findOne({
      where: { id, isActive: true },
      include: [{ model: Item }]
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateProcurementStatusDto): Promise<Procurement> {
    const procurement = await this.procurementRepository.findOne({
      where: { id, isActive: true }
    });

    if (!procurement) {
      throw new BadRequestException('Procurement not found');
    }

    if (procurement.status === 'COMPLETED') {
      throw new BadRequestException('Cannot update completed procurement');
    }

    if (updateStatusDto.status === 'APPROVED' && procurement.status === 'PENDING') {
      // Create inventory entry when procurement is approved
      await this.inventoryRepository.create({
        itemId: procurement.itemId,
        procurementId: procurement.id,
        quantity: procurement.quantity,
        status: 'AVAILABLE'
      });

      procurement.status = 'COMPLETED';
    } else {
      procurement.status = updateStatusDto.status;
    }

    if (updateStatusDto.remarks) {
      procurement.remarks = updateStatusDto.remarks;
    }

    await procurement.save();
    return procurement;
  }

  async remove(id: number): Promise<number> {
    return this.procurementRepository.update(
      { isActive: false },
      { where: { id, isActive: true } }
    ).then(([affectedCount]) => affectedCount);
  }
} 