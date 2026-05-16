import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user-entities';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryFile } from 'src/cloudinary/entities/cloudinary-file.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly studentService: UsersService,
    private readonly notificationService: NotificationsService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto): Future {
    try {
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      const newDto = { ...createAdminDto, password: hashedPassword };
      const admin = this.adminRepository.create(newDto);
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
        phone: admin.phone,
        department: admin.department,
        position: admin.position,
        profileImage: admin.profileImage,
        createdAt: admin.createdAt,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findAll(isStaff?: boolean, level?: number): Future {
    try {
      const admin = await this.adminRepository.find({
        where: {
          isStaff: isStaff ?? false,
          level: level ?? undefined,
        },
      });

      if (admin.length === 0) {
        return errorResponse('No admins available');
      }

      const resData = admin.map((ad) => ({
        id: ad.id,
        name: ad.name,
        email: ad.email,
        level: ad.level,
        isStaff: ad.isStaff,
        phone: ad.phone,
        department: ad.department,
        position: ad.position,
        profileImage: ad.profileImage,
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
        phone: admin.phone,
        department: admin.department,
        position: admin.position,
        profileImage: admin.profileImage,
        createdAt: admin.createdAt,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
    file?: Express.Multer.File,
  ): Future {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      if (!admin) {
        return errorResponse('Admin not found');
      }
      if (file) {
        const profileImage = await this.cloudinaryService.uploadFile(
          file,
          'excos',
        );
        const cloudFile = profileImage.data as CloudinaryFile;
        admin.profileImage = cloudFile.secureUrl;
        admin.publicId = cloudFile.publicId;
      }
      Object.assign(admin, updateAdminDto);
      await this.adminRepository.save(admin);
      return successResponse('Successfully Updated', {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        level: admin.level,
        isStaff: admin.isStaff,
        phone: admin.phone,
        department: admin.department,
        profileImage: admin.profileImage,
        position: admin.position,
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
      if (admin.publicId != null) {
        await this.cloudinaryService.deleteFile(admin.publicId);
      }
      await this.adminRepository.remove(admin);
      return successResponse('Successfully Deleted', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async makeRep(id: number): Future {
    try {
      const student = await this.userRepository.findOneBy({ id });
      if (!student) {
        return errorResponse('Student not found');
      }
      const update = await this.studentService.updateUser(student.mat_no, {
        isAdmin: true,
      });
      return successResponse('Successfully made representative', update.data);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async removeRep(id: number): Future {
    try {
      const student = await this.userRepository.findOneBy({ id });
      if (!student) {
        return errorResponse('Student not found');
      }
      const update = await this.studentService.updateUser(student.mat_no, {
        isAdmin: false,
      });
      return successResponse(
        'Successfully removed representative',
        update.data,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }
  async makeStaff(id: number): Future {
    try {
      const admin = await this.adminRepository.findOneBy({ id });
      if (!admin) {
        return errorResponse('Admin not found');
      }
      await this.adminRepository.update(admin.id, {
        isStaff: true,
      });
      return successResponse('Successfully made staff', admin);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async broadcastNotification(title: string, notification: string): Future {
    try {
      const newNotification = await this.notificationService.createNotification(
        title,
        notification,
      );
      return successResponse(
        'Notification sent successfully',
        newNotification.data,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }
}
