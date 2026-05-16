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
    try {
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
    } catch (e) {
      return errorResponse(e);
    }
  }

  async getDownloadUrl(publicId: string): Future {
    try {
      const file = await this.fileRepository.findOne({ where: { publicId } });
      if (!file) {
        return errorResponse('File not found');
      }
      const downloadUrl = cloudinary.url(publicId, {
        resource_type: file.resourceType || 'raw',
        type: file.format || 'auto',
        flags: 'attachment', // Forces the browser to download instead of opening
        secure: true, // Ensures the link uses HTTPS
        sign_url: true,
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
      const file = await this.fileRepository.findOne({
        where: { publicId },
      });

      if (!file) {
        return errorResponse('File not found');
      }

      await cloudinary.uploader.destroy(publicId, {
        resource_type: file.resourceType || 'raw',
        type: file.format || 'auto',
      });

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
  async listAllFiles(): Future {
    try {
      const files = await this.fileRepository.find();
      return successResponse('All files retrieved successfully', files);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async updateFile(publicId: string, newFile: Express.Multer.File): Future {
    try {
      const file = await this.fileRepository.findOne({ where: { publicId } });
      if (!file) {
        return errorResponse('File not found');
      }
      // Delete the old file from Cloudinary
      await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
      // Upload the new file to Cloudinary
      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'uploads',
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
            .end(newFile.buffer);
        },
      );
      // Update the file entity in the database
      file.name = newFile.originalname;
      file.publicId = uploadResult.public_id;
      file.url = uploadResult.url;
      file.secureUrl = uploadResult.secure_url;
      file.format = uploadResult.format;
      file.resourceType = uploadResult.resource_type;
      await this.fileRepository.save(file);
      return successResponse('File updated successfully', file);
    } catch (e) {
      return errorResponse(e);
    }
  }
}
