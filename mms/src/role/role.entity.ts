import { ApiProperty } from '@nestjs/swagger';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    BelongsToMany,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';

const tableOptions = {
    tableName: 'role',
}

@Table(tableOptions)
export class Role extends Model<Role> {
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
    roleCode: string;


    @Column({
        defaultValue: false
    })
    isActive: boolean;


    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;

    // forign keys

    @BelongsToMany(() => Company, () => CompanyRole)
    @ApiProperty({ type: () => [Company] })
    companies: Company[];
}

@Table
export class CompanyRole extends Model<CompanyRole> {
    @ForeignKey(() => Company)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })

    companyId: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })

    roleId: number;

}