import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), CloudinaryModule],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
