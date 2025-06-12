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

const kitchenPayloadOptions = {
  tableName: 'kitchen_payload',
}

@Table(kitchenPayloadOptions)
export class KitchenPayload extends Model<KitchenPayload> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  payload: Record<string, any>;

  @BelongsTo(() => Kitchen)
  kitchen: Kitchen;

  @CreatedAt 
  public createdAt: Date;

  @UpdatedAt 
  public updatedAt: Date;

  @DeletedAt 
  public deletedAt: Date;
} 