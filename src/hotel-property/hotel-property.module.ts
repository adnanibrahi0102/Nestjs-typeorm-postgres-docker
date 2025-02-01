import { Module } from '@nestjs/common';
import { HotelPropertyService } from './hotel-property.service';
import { HotelPropertyResolver } from './hotel-property.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [HotelPropertyResolver, HotelPropertyService],
})
export class HotelPropertyModule {}
