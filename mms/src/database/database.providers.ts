import { Sequelize } from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { Menu } from 'src/menu/menu.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { TableModel } from 'src/table/table.entity';



export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'mms',
        // ssl: true,
        // dialectOptions: {
        //   ssl: true
        // }
      });
      sequelize.addModels([ Company, Product, Menu, ProductCategory, TableModel]);
      await sequelize.sync({alter:true});
      return sequelize;
    },
  },
];