import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryFile } from 'src/cloudinary/entities/cloudinary-file.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createResultDto: CreateResultDto): Future {
    try {
      const result = this.resultRepository.create(createResultDto);
      await this.resultRepository.save(result);
      return successResponse('Result created successfully', result);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findAll(): Future {
    try {
      const results = await this.resultRepository.find();
      return successResponse('Results retrieved successfully', results);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findOne(id: number): Future {
    try {
      const result = await this.resultRepository.findOneBy({ id });
      if (!result) return errorResponse('Result not found');
      return successResponse('Result retrieved successfully', result);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async update(
    id: number,
    updateResultDto: UpdateResultDto,
    file?: Express.Multer.File,
  ): Future {
    try {
      const result = await this.resultRepository.findOneBy({ id });
      if (!result) return errorResponse('Result not found');

      if (file) {
        const upload = await this.cloudinaryService.uploadFile(file, 'results');
        const cloudFile = upload.data as CloudinaryFile;
        updateResultDto.file = cloudFile.secureUrl;
      }

      await this.resultRepository.update(id, updateResultDto);
      const updatedResult = await this.resultRepository.findOneBy({ id });
      return successResponse('Result updated successfully', updatedResult);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async remove(id: number): Future {
    try {
      const result = await this.resultRepository.findOneBy({ id });
      if (!result) return errorResponse('Result not found');
      await this.resultRepository.remove(result);
      return successResponse('Result deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
}
