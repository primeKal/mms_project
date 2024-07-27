import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company } from "src/company/company.entity";

const tableOptions = {
    tableName: 'billing',
}
@Table(tableOptions)
export class Billing extends Model<Billing> {
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
    totalOrders: number;

    @Column({
        allowNull: true,
    })
    totalBilledAmount: number;

    @Column({ type: DataType.DATEONLY })
    month: string;

    @ForeignKey(() => Company)
    companyId: number

    @BelongsTo(() => Company)
    company: Company
}
