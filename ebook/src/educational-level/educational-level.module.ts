import { Module } from '@nestjs/common';
import { EducationalLevelController } from './educational-level.controller';
import { EducationalLevelService } from './educational-level.service';

@Module({
  controllers: [EducationalLevelController],
  providers: [EducationalLevelService]
})
export class EducationalLevelModule {}
