import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from 'src/events/dto/events-dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  @Post('create-event')
  async createEvent(@Body() Body: CreateEventDto) {
    return await this.eventService.createEvent(Body);
  }
  @Post('update-event')
  async updateEvent(
    @Query('event_id', ParseIntPipe) event_id: number,
    @Body() Body: CreateEventDto,
  ) {
    return await this.eventService.updateEvent(event_id, Body);
  }
  @Delete('delete-event')
  async deleteEvent(@Query('event_id', ParseIntPipe) event_id: number) {
    return await this.eventService.deleteEvent(event_id);
  }
  @Get('find-one-event')
  async findOneEvent(@Query('id', ParseIntPipe) id: number) {
    return await this.eventService.findOneEvent(id);
  }

  @Get('find-all-events')
  async findAllEvents(@Query('date') date: string) {
    return await this.eventService.findAllEvents(date);
  }
  @Get('total-events')
  async findTotalEvents() {
    return await this.eventService.findTotalEvents();
  }
}
