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
import { User } from 'src/user/entities/user.entity';

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

    @BelongsToMany(() => User, () => UserRole)
    @ApiProperty({ type: () => [User] })
    users: User[];
}

@Table
export class UserRole extends Model<UserRole> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })

    userId: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })

    roleId: number;
}