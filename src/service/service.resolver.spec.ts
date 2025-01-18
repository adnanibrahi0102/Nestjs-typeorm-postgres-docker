import { Test, TestingModule } from '@nestjs/testing';
import { ServiceResolver } from './service.resolver';
import { ServiceService } from './service.service';

describe('ServiceResolver', () => {
  let resolver: ServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceResolver, ServiceService],
    }).compile();

    resolver = module.get<ServiceResolver>(ServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
