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
import { Col } from 'sequelize/types/utils';
import { Billing } from 'src/billing/entities/billing.entity';
import { Menu } from 'src/menu/menu.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { TableModel } from 'src/table/table.entity';
import { User } from 'src/user/entities/user.entity';

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
    allowNull: true,
  })
  website: string;

  @Column({
    allowNull: true,
  })
  story: string;


  @Column({
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;


  @Column({
    defaultValue: 0
  })
  linkCount: number;

  @Column({
    allowNull: false,
    defaultValue: true
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

  @Column({
    allowNull: true,
  })
  imgUrl: string;

  @Column({
    allowNull: true,
    defaultValue: null
  })
  telegramChatId: string;

  @Column({
    allowNull: true,
    defaultValue: null
  })
  telegramUserName: string;

  @Column({
    allowNull: true
  })
  company_img: string;


  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  // foreign keys
  @HasMany(() => Product)
  products: Product[]

  @HasMany(() => ProductCategory)
  productCategories: ProductCategory[]

  @HasMany(() => Menu)
  menus: Menu[]

  @HasMany(() => TableModel)
  tables: TableModel[]


  @HasMany(() => Billing)
  bills: Billing[]

  @HasMany(() => User)
  users: User[]
}