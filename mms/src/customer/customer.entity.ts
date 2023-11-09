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
import { ProductCategory } from 'src/product-category/product.category.entity';

  const tableOptions = {
    tableName: 'customer',
  } 
  
  @Table(tableOptions)
  export class Customer extends Model<Customer> {
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
    phoneNumber: string;

    @Column({
        allowNull: true,
      })
      name: string;
    
    @Column({
    defaultValue: false
    })
    isActive: boolean;


    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;

    // forign keys

    @HasMany(() => Order)
    orders: Order[]
  }