import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  ForeignKey,
  HasMany
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { Order } from 'src/order/order.entity';
import { TABLE_STATUS_VALUES } from 'src/utils/constants';

const tableOptions = {
  tableName: 'table',
}

@Table(tableOptions)
export class TableModel extends Model<TableModel> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: true,
  })
  name: string;

  @Column({
    allowNull: true,
  })
  number: number;

  @Column({
    allowNull: true,
  })
  size: number;

  @Column({
    type: DataType.ENUM(...TABLE_STATUS_VALUES),
    allowNull: false,
    defaultValue: 'Open'
  })
  status: string;

  @Column({
    defaultValue: false
  })
  isActive: boolean;


  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  // forign keys

  @ForeignKey(() => Company)
  companyId: number

  @BelongsTo(() => Company)
  company: Company

  @HasMany(() => Order)
  orders: Order[]

}