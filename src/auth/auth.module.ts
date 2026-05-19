import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/users/entities/user-entities';

import { JwtStrategy } from './jwt.strategy';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super_admin.guard';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MY_SECRET',

      signOptions: {
        expiresIn: '1d',
      },
    }),

    TypeOrmModule.forFeature([Admin, User]),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy, AdminGuard, SuperAdminGuard],

  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    AdminGuard,
    SuperAdminGuard,
  ],
})
export class AuthModule {}
