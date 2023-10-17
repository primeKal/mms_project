import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
  } from 'sequelize-typescript';
  
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
      allowNull: true,
    })
    password: string;
  
    @Column({
      allowNull: false,
      defaultValue:true
    })
    hasPassword: boolean;
  
    @Column({
      allowNull: true,
    })
    authType: string;
  
    @Column({
      defaultValue: 0
    })
    linkCount: number;
  
    @Column({
      allowNull: false,
      defaultValue: false
    })
    isActive: boolean;

    @Column({
        allowNull: false,
        defaultValue: false
      })
      moto: string;
  
  
    @CreatedAt public createdAt: Date;
  
    @UpdatedAt public updatedAt: Date;
  
    @DeletedAt public deletedAt: Date;
  
    // forign keys
    // @HasMany(() => Socialmedia)
    // socialmedias: Socialmedia[]
  }