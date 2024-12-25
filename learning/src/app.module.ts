import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nest_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: ['src/migrations/*.ts'],
    }),
    MessagesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
