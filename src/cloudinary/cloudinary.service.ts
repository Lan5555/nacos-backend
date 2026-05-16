/// <reference types="multer" />
// src/cloudinary/cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { CloudinaryFile } from './entities/cloudinary-file.entity';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectRepository(CloudinaryFile)
    private readonly fileRepository: Repository<CloudinaryFile>,
  ) {}

  async uploadFile(file: Express.Multer.File, folder = 'uploads'): Future {
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              resource_type: 'auto',
            },
            (error, result) => {
              if (error || !result) {
                return reject(
                  new Error(error?.message || 'Cloudinary upload failed'),
                );
              }
              resolve(result);
            },
          )
          .end(file.buffer);
      },
    );

    const fileEntity = this.fileRepository.create({
      name: file.originalname,
      publicId: uploadResult.public_id,
      url: uploadResult.url,
      secureUrl: uploadResult.secure_url,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
    });

    await this.fileRepository.save(fileEntity);
    return successResponse('File uploaded successfully', fileEntity);
  }

  async getDownloadUrl(
    publicId: string,
    resourceType: string = 'auto',
  ): Future {
    try {
      const file = await this.fileRepository.findOne({ where: { publicId } });
      if (!file) {
        return errorResponse('File not found');
      }
      const downloadUrl = cloudinary.url(publicId, {
        resource_type: resourceType,
        flags: 'attachment', // Forces the browser to download instead of opening
        secure: true, // Ensures the link uses HTTPS
      });
      return successResponse(
        'Download URL generated successfully',
        downloadUrl,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }

  async deleteFile(publicId: string): Future {
    try {
      const file = await this.fileRepository.findOne({ where: { publicId } });
      if (!file) {
        return errorResponse('File not found');
      }
      await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
      await this.fileRepository.remove(file);
      return successResponse('File deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async getFile(publicId: string): Future {
    try {
      const file = await this.fileRepository.findOne({ where: { publicId } });
      if (!file) {
        return errorResponse('File not found');
      }
      return successResponse('File retrieved successfully', file);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async listFiles(publicId?: string): Future {
    try {
      const files = await this.fileRepository.find({ where: { publicId } });
      return successResponse('Files retrieved successfully', files);
    } catch (e) {
      return errorResponse(e);
    }
  }
}
