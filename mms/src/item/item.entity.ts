import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany
} from 'sequelize-typescript';
import { Inventory } from '../inventory/inventory.entity';
import { MEASUREMENT_UNITS } from '../utils/constants';

const itemOptions = {
  tableName: 'item',
}

@Table(itemOptions)
export class Item extends Model<Item> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  unitPrice: number;

  @Column({
    allowNull: true,
  })
  unit: string;

  @Column({
    type: DataType.ENUM(...MEASUREMENT_UNITS),
    allowNull: false,
    defaultValue: 'KG'
  })
  measurementUnit: string;

  @Column({
    defaultValue: true
  })
  isActive: boolean;

  @CreatedAt 
  public createdAt: Date;

  @UpdatedAt 
  public updatedAt: Date;

  @DeletedAt 
  public deletedAt: Date;

  @HasMany(() => Inventory)
  inventories: Inventory[];
} 