import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/users/entities/user-entities';

import { JwtStrategy } from './jwt.strategy';

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

  providers: [AuthService, JwtStrategy],

  exports: [AuthService, JwtModule],
})
export class AuthModule {}
