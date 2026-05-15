import { Test, TestingModule } from '@nestjs/testing';
import { StudentNotificationsService } from './student_notifications.service';

describe('StudentNotificationsService', () => {
  let service: StudentNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentNotificationsService],
    }).compile();

    service = module.get<StudentNotificationsService>(StudentNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
