import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from 'src/events/dto/events-dto';
import { Events } from 'src/events/entities/events-entity';
import { errorResponse, Future, successResponse } from 'src/helpers/helpers';
import { Between, Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
  ) {}

  async createEvent(body: CreateEventDto): Future {
    try {
      const event = this.eventsRepository.create(body);

      await this.eventsRepository.save(event);

      return successResponse('Event Added Successfully', event);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async updateEvent(event_id: number, body: Partial<CreateEventDto>): Future {
    try {
      const event = await this.eventsRepository.findOneBy({
        id: event_id,
      });

      if (!event) {
        return errorResponse('Event Not Found');
      }

      Object.assign(event, body);

      await this.eventsRepository.save(event);

      return successResponse('Updated Successfully', event);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async deleteEvent(event_id: number): Future {
    try {
      const event = await this.eventsRepository.findOneBy({
        id: event_id,
      });

      if (!event) {
        return errorResponse('Event Not Found');
      }

      await this.eventsRepository.remove(event);

      return successResponse('Deleted Event Successfully', null);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findOneEvent(id: number): Future {
    try {
      const event = await this.eventsRepository.findOneBy({ id });

      if (!event) {
        return errorResponse('Event Not Found');
      }

      return successResponse('Successfully Processed', event);
    } catch (e) {
      return errorResponse(e);
    }
  }

  async findAllEvents(date: string): Future {
    try {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const events = await this.eventsRepository.find({
        where: {
          createdAt: Between(start, end),
        },
      });

      return successResponse('Events fetched successfully', events);
    } catch (e) {
      return errorResponse(e);
    }
  }
  async findTotalEvents(): Future {
    try {
      const count = await this.eventsRepository.count();
      return successResponse('Total number of events retrieved successfully', {
        totalEvents: count,
      });
    } catch (e) {
      return errorResponse(e);
    }
  }
}
