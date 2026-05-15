import { Test, TestingModule } from '@nestjs/testing';
import { StudentNotificationsController } from './student_notifications.controller';

describe('StudentNotificationsController', () => {
  let controller: StudentNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentNotificationsController],
    }).compile();

    controller = module.get<StudentNotificationsController>(StudentNotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
