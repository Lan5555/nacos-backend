import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { SuperAdminGuard } from 'src/auth/guards/super_admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Post('save-contact')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get('find-all-contacts')
  findAll() {
    return this.contactService.findAll();
  }

  @Get('find-one-contact/:id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Patch('update-contact/:id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }
  @UseGuards(AuthGuard('jwt'), SuperAdminGuard)
  @Delete('delete-contact/:id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
