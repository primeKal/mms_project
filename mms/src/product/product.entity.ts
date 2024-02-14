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
    BelongsToMany,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';


const tableOptions = {
    tableName: 'product',
}

@Table(tableOptions)
export class Product extends Model<Product> {
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
    link: string;

    @Column({
        allowNull: false,
    })
    name: string;
    @Column({
        allowNull: true,
    })
    description: string;

    @Column({
        allowNull: true,
    })
    icon: string;

    @Column({
        allowNull: true,
    })
    picture: string;

    @Column({
        defaultValue: 0
    })
    price: number;

    @Column({
        defaultValue: false,
    })
    isActive: boolean;

    @Column({
        allowNull: true,
      })
    imgUrl: string;


    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;


    // forign keys

    @ForeignKey(() => Company)
    companyId: number

    @BelongsTo(() => Company)
    company: Company


    @BelongsToMany(() => ProductCategory, () => ProductCategoryProduct)
    @ApiProperty({ type: () => [ProductCategory] })
    productCategories: ProductCategory[];
}
@Table
export class ProductCategoryProduct extends Model<ProductCategoryProduct> {
    @ForeignKey(() => Product)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })

    productId: number;

    @ForeignKey(() => ProductCategory)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })

    productCategoryId: number;

}