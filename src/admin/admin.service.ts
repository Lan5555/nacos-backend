import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto): Future {
    try {
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      createAdminDto.password = hashedPassword;
      const admin = this.adminRepository.create(createAdminDto);
      await this.adminRepository.save(admin);
      return successResponse('Admin Registered Successfully', admin);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async login(email: string, password: string): Future {
    try {
      const admin = await this.adminRepository.findOne({ where: { email } });
      const isPasswordValid = admin
        ? await bcrypt.compare(password, admin.password)
        : false;
      if (!admin || !isPasswordValid) {
        return errorResponse('Invalid credentials');
      }
      return successResponse('Login successful', {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        level: admin.level,
        isStaff: admin.isStaff,
        createdAt: admin.createdAt,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findAll(): Future {
    try {
      const admin = await this.adminRepository.find();
      if (!admin) {
        return errorResponse('No admins available');
      }
      const resData = admin.map((ad) => ({
        id: ad.id,
        name: ad.name,
        email: ad.email,
        level: ad.level,
        isStaff: ad.isStaff,
        createdAt: ad.createdAt,
      }));
      return successResponse('Admins queried successfully', resData);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findOne(id: number): Future {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      if (!admin) {
        return errorResponse('Admin not found');
      }
      return successResponse('Successfully processed', {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        level: admin.level,
        isStaff: admin.isStaff,
        createdAt: admin.createdAt,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Future {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      if (!admin) {
        return errorResponse('Admin not found');
      }
      Object.assign(admin, updateAdminDto);
      await this.adminRepository.save(admin);
      return successResponse('Successfully Updated', {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        level: admin.level,
        isStaff: admin.isStaff,
        createdAt: admin.createdAt,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async remove(id: number): Future {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      if (!admin) {
        return errorResponse('Admin not found');
      }
      await this.adminRepository.remove(admin);
      return successResponse('Successfully Deleted', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
}
