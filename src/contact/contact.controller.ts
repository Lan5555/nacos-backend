import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

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

  @Patch('update-contact/:id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete('delete-contact/:id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
