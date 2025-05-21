import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Item } from '../item/item.entity';
import { Procurement } from '../procurement/procurement.entity';

const inventoryOptions = {
  tableName: 'inventory',
}

@Table(inventoryOptions)
export class Inventory extends Model<Inventory> {
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

  @ForeignKey(() => Procurement)
  @Column({
    allowNull: false,
  })
  procurementId: number;

  @BelongsTo(() => Procurement)
  procurement: Procurement;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    type: DataType.ENUM('AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK'),
    allowNull: false,
    defaultValue: 'AVAILABLE'
  })
  status: string;

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
} 