import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const options: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASS,
  database: env.DB_NAME,
  migrationsRun: true,
  migrations: ['./dist/migration/*.js'],
  entities: [UserEntity],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: false,
};

export const connectionSource = new DataSource(options);
