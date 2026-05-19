import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Future } from 'src/helpers/helpers';
import type { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';
@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('cloud')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Future {
    return this.cloudinaryService.uploadFile(file, folder);
  }

  @Get('download-url')
  async getDownloadUrl(@Query('publicId') publicId: string): Future {
    return this.cloudinaryService.getDownloadUrl(publicId);
  }

  @Delete('delete')
  async deleteFile(@Query('publicId') publicId: string): Future {
    return this.cloudinaryService.deleteFile(publicId);
  }
  @Get('get')
  async getFile(@Query('publicId') publicId: string): Future {
    return this.cloudinaryService.getFile(publicId);
  }
  @Get('list')
  async listFiles(@Query('publicId') publicId?: string): Future {
    return this.cloudinaryService.listFiles(publicId);
  }
  @Get('list-all')
  async listAllFiles(): Future {
    return this.cloudinaryService.listAllFiles();
  }
  @Post('update')
  async updateFile(
    @Query('publicId') publicId: string,
    @UploadedFile() newFile: Express.Multer.File,
  ): Future {
    return this.cloudinaryService.updateFile(publicId, newFile);
  }
}
