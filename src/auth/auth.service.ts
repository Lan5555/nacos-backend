import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { Admin } from 'src/admin/entities/admin.entity';

import { User } from 'src/users/entities/user-entities';

import { errorResponse, Future, successResponse } from 'src/helpers/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async loginAdmin(email: string, password: string): Future {
    try {
      const admin = await this.adminRepository.findOne({
        where: { email },
      });

      const isPasswordValid = admin
        ? await bcrypt.compare(password, admin.password)
        : false;

      if (!admin || !isPasswordValid) {
        return errorResponse('Invalid credentials');
      }

      /**
       * JWT Payload
       */
      const payload = {
        id: admin.id,
        email: admin.email,
        isStaff: admin.isStaff,
        role: 'admin',
      };

      /**
       * Generate Token
       */
      const access_token = this.jwtService.sign(payload);

      return successResponse('Login successful', {
        access_token,

        admin: {
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
        },
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async loginUser(mat_no: string, password: string): Future {
    try {
      const user = await this.userRepository.findOne({
        where: { mat_no },
      });

      const isPasswordValid = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!user || !isPasswordValid) {
        return errorResponse('Invalid credentials');
      }

      /**
       * JWT Payload
       */
      const payload = {
        id: user.id,
        mat_no: user.mat_no,
        email: user.email,
        isAdmin: user.isAdmin,
        role: 'user',
      };

      /**
       * Generate Token
       */
      const access_token = this.jwtService.sign(payload);

      return successResponse('Login successful', {
        access_token,

        user: {
          id: user.id,
          mat_no: user.mat_no,
          name: user.name,
          email: user.email,
          department: user.department,
          phone: user.phone,
          level: user.level,
          isAdmin: user.isAdmin,
        },
      });
    } catch (e) {
      return errorResponse(e);
    }
  }
}
