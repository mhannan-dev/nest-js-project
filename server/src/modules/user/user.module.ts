import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  controllers: [UserController],
  providers: [UserService, UserRepository], // Register both Service and Repository
  exports: [UserService], // Export UserService if other modules need it
})
export class UserModule {}
