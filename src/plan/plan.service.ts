import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { PrismaService } from 'prisma/prisma.service';
import { PlanEntity, PlanFindAllResponse } from './entities/plan.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService) {}
  async createPlan(createPlanInput: CreatePlanInput) {
    try {
      const plan = await this.prismaService.plan.create({
        data: {
          name: createPlanInput.name,
          features: createPlanInput.features,
          price: createPlanInput.price,
        },
      });

      if (!plan) {
        console.log('Plan not created');
        throw new HttpException('Plan not created', HttpStatus.BAD_REQUEST);
      }
      console.log(plan);
      return {
        status: HttpStatus.CREATED,
        message: 'Plan created successfully',
        success: true,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllPlans(): Promise<PlanFindAllResponse> {
    try {
      const plans = await this.prismaService.plan.findMany();

      if (!plans || plans.length === 0) {
        throw new HttpException('Plans not found', HttpStatus.NOT_FOUND);
      }
      const planEntities: PlanEntity[] = plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        features: plan.features,
        price: plan.price.toNumber(), // Assuming price is a Decimal
      }));

      return {
        status: HttpStatus.OK,
        message: 'Plans fetched successfully',
        success: true,
        data: planEntities,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOnePlan(id: string) {
    try {
      const plan = await this.prismaService.plan.findUnique({
        where: {
          id: id,
        },
      });
      if (!plan) {
        throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);
      }
      const planEntities: PlanEntity = {
        id: plan.id,
        name: plan.name,
        features: plan.features,
        price: plan.price.toNumber(), // Assuming price is a Decimal
      };

      return {
        status: HttpStatus.OK,
        message: 'Plans fetched successfully',
        success: true,
        data: planEntities,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updatePlanInput: UpdatePlanInput) {
    try {
      const updateData: any = {};
      if (updatePlanInput.name) {
        updateData.name = updatePlanInput.name;
      }
      if (updatePlanInput.features) {
        updateData.features = updatePlanInput.features;
      }
      if (updatePlanInput.price) {
        updateData.price = updatePlanInput.price;
      }
      const plan = await this.prismaService.plan.update({
        where: {
          id: id,
        },
        data: updateData,
      });

      if (!plan) {
        throw new HttpException('Plan not updated', HttpStatus.NOT_MODIFIED);
      }
      return {
        status: HttpStatus.OK,
        message: 'Plan updated successfully',
        success: true,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.plan.delete({
        where: {
          id: id,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Plan deleted successfully',
        success: true,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
