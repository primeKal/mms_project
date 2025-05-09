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
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { Role, UserRole } from 'src/role/role.entity';

const tableOptions = {
  tableName: 'user',
}

@Table(tableOptions)
export class User extends Model<User> {
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
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

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
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  hasPassword: boolean;

  @Column({
    allowNull: true,
  })
  authType: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  isActive: boolean;

  @Column({
    allowNull: true,
  })
  phoneNumber: string;

  @Column({
    allowNull: true,
  })
  profileImage: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  companyId: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  // Relationships
  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Role, () => UserRole)
  @ApiProperty({ type: () => [Role] })
  roles: Role[];
}