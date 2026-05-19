import { Injectable } from '@nestjs/common';
import { CreateContactDto, SendEmailDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { MailService } from 'src/workers/email-service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailService: MailService,
  ) {}

  async create(createContactDto: CreateContactDto): Future {
    try {
      const contact = this.contactRepository.create(createContactDto);
      await this.contactRepository.save(contact);
      return successResponse('Contact created successfully', contact);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findAll(): Future {
    try {
      const contacts = await this.contactRepository.find();
      return successResponse('Contacts retrieved successfully', contacts);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findOne(id: number): Future {
    try {
      const contact = await this.contactRepository.findOneBy({ id });
      if (!contact) return errorResponse('Contact not found');
      return successResponse('Contact retrieved successfully', contact);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto): Future {
    try {
      await this.contactRepository.update(id, updateContactDto);
      const updatedContact = await this.contactRepository.findOneBy({ id });
      return successResponse('Contact updated successfully', updatedContact);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async remove(id: number): Future {
    try {
      const contact = await this.contactRepository.findOneBy({ id });
      if (!contact) return errorResponse('Contact not found');
      await this.contactRepository.remove(contact);
      return successResponse('Contact deleted successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async sendEmail(body: SendEmailDto) {
    try {
      const nacosEmail = await this.contactRepository.findOneBy({ id: 1 });
      if (!nacosEmail) {
        return errorResponse('Oops something went wrong');
      }
      await this.mailService.sendMail(
        nacosEmail.email,
        body.subject,
        'info',
        `${body.firstName} ${body.lastName} Sent a mail with message ${body.message}`,
      );
      return successResponse('Email sent successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }
}
