import { Sequelize } from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { Customer } from 'src/customer/customer.entity';
import { Menu } from 'src/menu/menu.entity';
import { Order } from 'src/order/order.entity';
import { OrderLine } from 'src/order/order.line.entity';
import { PaymentMethodModel } from 'src/payment-method/method.entity';
import { PaymentModel } from 'src/payment/payment.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product, ProductCategoryProduct } from 'src/product/product.entity';
import { CompanyRole, Role } from 'src/role/role.entity';
import { TableModel } from 'src/table/table.entity';



export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'mms',
        ssl: true,
        dialectOptions: {
          ssl: true
        }
      });
      sequelize.addModels([Company,
        Product,
        Menu,
        ProductCategory,
        TableModel,
        Order,
        OrderLine,
        Customer,
        Role,
        CompanyRole,
        ProductCategoryProduct,
        PaymentMethodModel,
        PaymentModel]);
      await sequelize.sync();
      // await sequelize.sync({ alter: true });

      return sequelize;
    },
  },
];