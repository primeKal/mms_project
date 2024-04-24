import { DataTypes } from 'sequelize';
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
import { PaymentModel } from 'src/payment/payment.entity';
import { PAYMENT_METHOD_TYPES, TABLE_STATUS_VALUES } from 'src/utils/constants';

const tableOptions = {
    tableName: 'payment-method',
}

@Table(tableOptions)
export class PaymentMethodModel extends Model<PaymentMethodModel> {
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
        type: DataType.ENUM(...PAYMENT_METHOD_TYPES),
        allowNull: false,
        defaultValue: 'Chapa'
    })
    type: string;

    //chapa private and public keys
    @Column({
        allowNull: true,
    })
    chapa_private_key: string;

    @Column({
        allowNull: true,
    })
    chapa_public_key: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    parameters: object;

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

    @HasMany(() => PaymentModel)
    payments: PaymentModel[]

}