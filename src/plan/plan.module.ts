import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanResolver } from './plan.resolver';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [PlanResolver, PlanService],
})
export class PlanModule {}
