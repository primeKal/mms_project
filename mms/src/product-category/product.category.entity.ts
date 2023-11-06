import { ApiProperty } from '@nestjs/swagger';
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
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { Menu } from 'src/menu/menu.entity';
import { Product } from 'src/product/product.entity';

const tableOptions = {
  tableName: 'product_category',
}

@Table(tableOptions)
export class ProductCategory extends Model<ProductCategory> {
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
  description: string;

  @Column({
    defaultValue: 0
  })
  count: number;

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


  @ForeignKey(() => Menu)
  menuId: number

  @BelongsTo(() => Menu)
  menu: Menu

  @HasMany(() => Product)
  products: Product[]
}