import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [ServiceResolver, ServiceService],
})
export class ServiceModule {}
