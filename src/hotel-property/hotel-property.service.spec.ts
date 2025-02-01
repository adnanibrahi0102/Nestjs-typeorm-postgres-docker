import { Test, TestingModule } from '@nestjs/testing';
import { HotelPropertyService } from './hotel-property.service';

describe('HotelPropertyService', () => {
  let service: HotelPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelPropertyService],
    }).compile();

    service = module.get<HotelPropertyService>(HotelPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
