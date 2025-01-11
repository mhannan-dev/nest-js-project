import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from '../role/role.module';
import { DistrictModule } from '../district/district.module';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, DistrictModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
