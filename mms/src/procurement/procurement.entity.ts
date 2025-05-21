import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
import { Item } from '../item/item.entity';
import { Inventory } from '../inventory/inventory.entity';

const procurementOptions = {
  tableName: 'procurement',
}

@Table(procurementOptions)
export class Procurement extends Model<Procurement> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => Item)
  @Column({
    allowNull: false,
  })
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  totalPrice: number;

  @Column({
    type: DataType.ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'),
    allowNull: false,
    defaultValue: 'PENDING'
  })
  status: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  remarks: string;

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

  @HasOne(() => Inventory)
  inventory: Inventory;
} 