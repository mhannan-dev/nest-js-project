import { typeOrmConfig } from './config/typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import { BookModule } from './book/book.module';
import { DistrictModule } from './district/district.module';
import { EducationalLevelModule } from './educational-level/educational-level.module';
import { ContributionModule } from './contribution/contribution.module';
import { RoleModule } from './role/role.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BookModule,
    CampaignModule,
    ContributionModule,
    DistrictModule,
    EducationalLevelModule,
    RoleModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
