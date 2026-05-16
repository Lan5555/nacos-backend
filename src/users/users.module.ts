import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user-entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MailService } from 'src/workers/email-service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, MailService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
