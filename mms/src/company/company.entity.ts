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
    BelongsToMany,
  } from 'sequelize-typescript';
import { Menu } from 'src/menu/menu.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { CompanyRole, Role } from 'src/role/role.entity';
import { TableModel } from 'src/table/table.entity';
  
  const tableOptions = {
    tableName: 'company',
  }
  
  @Table(tableOptions)
  export class Company extends Model<Company> {
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
      validate: {
        isEmail: true,
      },
      unique: true,
    })
    email: string;
  
    @Column({
      allowNull: false,
      unique: true
    })
    username: string;
  
    @Column({
      allowNull: true,
    })
    password: string;
  
    @Column({
      allowNull: false,
      defaultValue:true
    })
    hasPassword: boolean;
  
    @Column({
      allowNull: true,
    })
    authType: string;
  
    @Column({
      defaultValue: 0
    })
    linkCount: number;
  
    @Column({
      allowNull: false,
      defaultValue: false
    })
    isActive: boolean;

    @Column({
        allowNull: true,
        defaultValue: false
      })
      moto: string;

      @Column({
        allowNull: true,
      })
      address: string;

      @Column({
        allowNull: true,
      })
      contact_information: string;
    
      @Column({
        allowNull: true,
      })
      primaryColor: string;

      @Column({
        allowNull: true,
      })
      secondaryColor: string;

      @Column({
        allowNull: true,
      })
      specialFeatures: string;
  
  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  
    // forign keys
    @HasMany(() => Product)
    products: Product[]

    @HasMany(() => ProductCategory)
    productCategories: ProductCategory[]

    @HasMany(() => Menu)
    menus: Menu[]

    @HasMany(() => TableModel)
    tables: TableModel[]
    

    @BelongsToMany(() => Role, ()=> CompanyRole)
    @ApiProperty({ type: () => [Role] })
    roles: Role[];
  }