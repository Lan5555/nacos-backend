/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, ResetPasswordDto } from 'src/users/dto/user-dto';
import { User } from 'src/users/entities/user-entities';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import { MailService } from 'src/workers/email-service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async createUser(body: CreateUserDto): Future {
    try {
      const hashPassword = await bycrypt.hash(body.password, 10);
      const user = this.userRepository.create({
        ...body,
        password: hashPassword,
      });

      await this.userRepository.save(user);
      return {
        success: true,
        message: 'User created successfully',
        data: {
          id: user.id,
          mat_no: user.mat_no,
          name: user.name,
          email: user.email,
          department: user.department,
          phone: user.phone,
          level: user.level,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async login(mat_no: string, password: string): Future {
    try {
      const user = await this.userRepository.findOne({ where: { mat_no } });
      const isPasswordValid = user
        ? await bycrypt.compare(password, user.password)
        : false;

      if (!user || !isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials',
          data: null,
        };
      }
      return {
        success: true,
        message: 'Login successful',
        data: {
          id: user.id,
          mat_no: user.mat_no,
          name: user.name,
          email: user.email,
          department: user.department,
          phone: user.phone,
          level: user.level,
          isAdmin: user.isAdmin,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e instanceof Error ? e.message : String(e),
        data: null,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  async findAllUsers(level?: string, department?: string): Future {
    try {
      const users = await this.userRepository.find({
        where: {
          level: level ? level : undefined,
          department: department ? department : undefined,
        },
      });
      return {
        success: true,
        message: 'Users retrieved successfully',
        data: users.map((user) => ({
          id: user.id,
          mat_no: user.mat_no,
          name: user.name,
          email: user.email,
          department: user.department,
          level: user.level,
          phone: user.phone,
          isAdmin: user.isAdmin,
        })),
      };
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findOneUser(mat_no: string): Future {
    try {
      const user = await this.userRepository.findOneBy({ mat_no });
      if (user) {
        return successResponse('User retrieved successfully', {
          id: user.id,
          mat_no: user.mat_no,
          name: user.name,
          email: user.email,
          department: user.department,
          level: user.level,
          phone: user.phone,
          isAdmin: user.isAdmin,
        });
      } else {
        return errorResponse('User not found');
      }
    } catch (e) {
      return errorResponse(e);
    }
  }

  async test(): Future {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    return {
      success: true,
      message: 'Test successful backend working',
      data: { userId: 1, name: 'John Doe' },
    };
  }

  async updateUser(mat_no: string, updates: Partial<CreateUserDto>) {
    try {
      const user = await this.userRepository.findOneBy({ mat_no });
      if (!user) {
        return errorResponse('User not found');
      }
      Object.assign(user, updates);
      await this.userRepository.save(user);
      return successResponse('User updated successfully', user);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async deleteUser(mat_no: string) {
    try {
      const user = await this.userRepository.findOneBy({ mat_no });
      if (!user) {
        return errorResponse('User not found');
      }
      await this.userRepository.remove(user);
      return successResponse('User deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async createPasswordHashAndUpdateUser(
    mat_no: string,
    password: string,
  ): Future {
    try {
      const hash = await bycrypt.hash(password, 10);
      const user = await this.userRepository.findOneBy({ mat_no });
      if (!user) {
        return errorResponse('User not found');
      }
      user.password = hash;
      await this.userRepository.save(user);
      return successResponse('Password updated successfully', {
        id: user.id,
        mat_no: user.mat_no,
        name: user.name,
        email: user.email,
        department: user.department,
        level: user.level,
        phone: user.phone,
        isAdmin: user.isAdmin,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  async getTotalNumberOfUsers(): Future {
    try {
      const count = await this.userRepository.count();
      return successResponse('Total number of users retrieved successfully', {
        totalUsers: count,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }

  //===================================//
  generateOTP(): number {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  }
  verifyOTP(inputOtp: number, actualOtp: number) {
    try {
      if (inputOtp === actualOtp) {
        return successResponse('OTP verified successfully', { valid: true });
      } else {
        return successResponse('OTP verification failed', { valid: false });
      }
    } catch (e) {
      return errorResponse(e);
    }
  }
  //=====================================//
  async resetPassword(data: ResetPasswordDto): Future {
    try {
      const user = await this.userRepository.findOneBy({ mat_no: data.mat_no });
      if (!user) {
        return errorResponse('User not found');
      }
      const verifiedOtp = user.otp === data.otp;
      if (!verifiedOtp) {
        return errorResponse('Invalid Otp');
      }
      return await this.createPasswordHashAndUpdateUser(
        user.mat_no,
        data.password,
      );
    } catch (e) {
      return errorResponse(e);
    }
  }

  async sendOtp(id: number): Future {
    const otp = this.generateOTP();
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return errorResponse('User not Found');
      }
      await this.mailService.sendMail(
        user.email,
        'Your OTP Code',
        'otp',
        undefined,
        otp.toString(),
      );
      user.otp = otp.toString();
      await this.userRepository.save(user);
      return successResponse(`OTP sent successfully`, {
        email: user.email,
      });
    } catch (e) {
      const brevoError =
        (e as any)?.response?.body?.message ||
        (e as any)?.response?.text ||
        (e as any)?.message ||
        'Unknown email error';

      console.error('BREVO ERROR:', brevoError);

      return errorResponse(brevoError);
    }
  }

  async verifyMatNo(mat_no: string): Future {
    try {
      const user = await this.userRepository.findOneBy({ mat_no });
      if (!user) {
        return errorResponse('User not found');
      }
      if (user.password == null) {
        return successResponse('User does not have a password', {
          id: user.id,
          mat_no,
          email: user.email,
        });
      } else {
        return successResponse('User already has a password', null);
      }
    } catch (e) {
      return errorResponse(e);
    }
  }
}
