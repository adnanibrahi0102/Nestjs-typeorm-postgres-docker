import { Test, TestingModule } from '@nestjs/testing';
import { HotelPropertyResolver } from './hotel-property.resolver';
import { HotelPropertyService } from './hotel-property.service';

describe('HotelPropertyResolver', () => {
  let resolver: HotelPropertyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelPropertyResolver, HotelPropertyService],
    }).compile();

    resolver = module.get<HotelPropertyResolver>(HotelPropertyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
