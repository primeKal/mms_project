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
} from 'sequelize-typescript';
import { Kitchen } from './kitchen.entity';
import { Item } from '../../item/item.entity';

export enum ItemRequestStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED'
}

const itemCountOptions = {
  tableName: 'item_count',
}

@Table(itemCountOptions)
export class ItemCount extends Model<ItemCount> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => Kitchen)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  kitchenId: number;

  @ForeignKey(() => Item)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  itemId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @Column({
    type: DataType.ENUM(...Object.values(ItemRequestStatus)),
    allowNull: false,
    defaultValue: ItemRequestStatus.REQUESTED
  })
  status: ItemRequestStatus;

  @BelongsTo(() => Kitchen)
  kitchen: Kitchen;

  @BelongsTo(() => Item)
  item: Item;

  @CreatedAt 
  public createdAt: Date;

  @UpdatedAt 
  public updatedAt: Date;

  @DeletedAt 
  public deletedAt: Date;
} 