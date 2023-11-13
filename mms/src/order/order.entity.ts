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
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    allowNull: false,
  })
  totalTax: number;

  @Column({
    allowNull: true,
  })
  currency: string;


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
  success: string;

  @Column({
    defaultValue: 0
  })
  linkCount: number;


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