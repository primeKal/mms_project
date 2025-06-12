import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { KitchenPayload } from './kitchen-payload.entity';
import { ItemCount } from './item-count.entity';
import { Company } from 'src/company/company.entity';

const kitchenOptions = {
  tableName: 'kitchen',
}

@Table(kitchenOptions)
export class Kitchen extends Model<Kitchen> {
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
    defaultValue: true
  })
  isActive: boolean;

  @HasMany(() => ItemCount)
  itemCounts: ItemCount[];

  @HasMany(() => KitchenPayload)
  payloads: KitchenPayload[];

  @CreatedAt 
  public createdAt: Date;

  @UpdatedAt 
  public updatedAt: Date;

  @DeletedAt 
  public deletedAt: Date;

  @ForeignKey(() => Company)
  companyId: number

  @BelongsTo(() => Company)
  company: Company
} 