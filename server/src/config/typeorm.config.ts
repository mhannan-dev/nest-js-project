import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // Replace with your PostgreSQL username
  password: 'password', // Replace with your PostgreSQL password
  database: 'nest_app', // Replace with your database name
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Path to entity files
  synchronize: true, // Set to `true` for development; use `false` in production
};
