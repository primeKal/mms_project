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
import { PaymentMethodModel } from 'src/payment-method/method.entity';
import { PAYMENT_STATUS, TABLE_STATUS_VALUES } from 'src/utils/constants';

const tableOptions = {
    tableName: 'payment',
}

@Table(tableOptions)
export class PaymentModel extends Model<PaymentModel> {
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
    total: number;

    @Column({
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.ENUM(...PAYMENT_STATUS),
        allowNull: false,
        defaultValue: 'Draft'
    })
    status: string;

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

    @ForeignKey(() => Order)
    orderId: number

    @BelongsTo(() => Order)
    order: Order

    @ForeignKey(() => PaymentMethodModel)
    paymentMethodId: number

    @BelongsTo(() => PaymentMethodModel)
    paymentMethod: PaymentMethodModel


}