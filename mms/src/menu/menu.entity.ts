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
import { ProductCategory } from 'src/product-category/product.category.entity';

  const tableOptions = {
    tableName: 'menu',
  } 
  
  @Table(tableOptions)
  export class Menu extends Model<Menu> {
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
    link: string;

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

    @ForeignKey(() => Company)
    companyId: number
    
    @BelongsTo(() => Company)
    company: Company

    @HasMany(() => ProductCategory)
    productCategories: ProductCategory[]
  }