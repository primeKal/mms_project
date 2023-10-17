import { Sequelize } from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';



export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-mute-violet-76705724.us-east-1.postgres.vercel-storage.com',
        port: 5432,
        username: 'default',
        password: 'pTv75EHAJIws',
        database: 'trendy_merches',
        ssl: true,
        dialectOptions: {
          ssl: true
        }
      });
      sequelize.addModels([Company]);
      await sequelize.sync();
      return sequelize;
    },
  },
];