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
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { Company } from 'src/company/company.entity';
  
  const tableOptions = {
    tableName: 'order_lines',
  }
  
  @Table(tableOptions)
  export class OrderLine extends Model<OrderLine> {
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
        allowNull: false,
      })
    singlePrice: number;
  
    @Column({
      allowNull: true,
    })
    currency: string;
  
  
    @Column({
      allowNull: false,
    })
    quantity: number;
  
    @Column({
      allowNull: false,
      defaultValue:true
    })
    isActive: boolean;
  
  
    @Column({
      defaultValue: 0
    })
    linkCount: number;
  
  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  
    // forign keys

    //created by user
    @ForeignKey(() => Company)
    @Column({
      type: DataType.BIGINT
    })
    companyId: number;
  
    @BelongsTo(() => Company)
    @ApiProperty({ type : Company })
    company: Company;

    // order 
    @ForeignKey(() => Order)
    @Column({
      type: DataType.BIGINT
    })
    orderId: number;
  
    @BelongsTo(() => Order)
    @ApiProperty({ type : Order })
    order: Order;

    // product id
    @ForeignKey(() => Product)
    @Column({
      type: DataType.BIGINT
    })
    productId: number;
  
    @BelongsTo(() => Product)
    @ApiProperty({ type : Product })
    product: Product;


  }