import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './modules/user/user.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    CategoryModule,
    QuizModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
