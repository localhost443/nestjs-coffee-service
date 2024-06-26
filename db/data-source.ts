import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'coffeeshop',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  //   cli: {
  //     migrationsDir: 'src/migrations',
  //   },
};

const dataSource = new DataSource(dataSourceOption);

export { dataSourceOption, dataSource };
