import { DataSource } from 'typeorm';

require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.{ts,js}', 'src/**/*.entity.{ts,js}'],
  migrations: ['src/migration/*.{ts,js}', 'dist/migration/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file',
  synchronize: process.env.MODE === 'development',
});
