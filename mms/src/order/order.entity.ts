import { ApiProperty } from '@nestjs/swagger';
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
  BelongsToMany,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { OrderLine } from './order.line.entity';
import { TableModel } from 'src/table/table.entity';
import { Customer } from 'src/customer/customer.entity';
import { ORDER_STATUS_VALUES } from 'src/utils/constants';
// import { v4 as uuidv4 } from 'uuid'; 


const tableOptions = {
  tableName: 'orders',
}

@Table(tableOptions)
export class Order extends Model<Order> {
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
    allowNull: true,
  })
  customerPhone: string;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  totalPrice: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  totalTax: number;

  @Column({
    allowNull: true,
  })
  currency: string;


  // @Column({
  //   type: DataType.UUID,
  //   defaultValue: () => uuidv4(),
  //   allowNull: true,
  // })
  // uniqueCode: string;

  @Column({
    allowNull: true,
  })
  uniqueCode: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  isActive: boolean;

  @Column({
    allowNull: false,
    defaultValue: false
  })
  isPaid: boolean;

  @Column({
    allowNull: false,
    defaultValue: false
  })
  success: string;

  @Column({
    defaultValue: 0
  })
  linkCount: number;

  @Column({
    type: DataType.ENUM(...ORDER_STATUS_VALUES),
    allowNull: false,
    defaultValue: 'Ordered'
  })
  status: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  // forign keys

  @ForeignKey(() => Company)
  @Column({
    type: DataType.BIGINT
  })
  companyId: number;

  @BelongsTo(() => Company)
  @ApiProperty({ type: Company })
  company: Company;

  @HasMany(() => OrderLine)
  orderlines: OrderLine[]


  @ForeignKey(() => TableModel)
  tableId: number

  @BelongsTo(() => TableModel)
  table: TableModel


  @ForeignKey(() => Customer)
  customerId: number

  @BelongsTo(() => Customer)
  customer: Customer
}