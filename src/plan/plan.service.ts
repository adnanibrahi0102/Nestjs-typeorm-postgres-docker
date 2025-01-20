import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { PrismaService } from 'prisma/prisma.service';
import { PlanEntity, PlanFindAllResponse } from './entities/plan.entity';

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
      console.log(plans);

      if (!plans || plans.length === 0) {
        throw new HttpException('Plans not found', HttpStatus.NOT_FOUND);
      }
      const planEntities: PlanEntity[] = plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        features: plan.features,
        price: plan.price.toNumber(), // Assuming price is a Decimal
      }));
      console.log('planEntities:', planEntities);

      return {
        status: HttpStatus.OK,
        message: 'Plans fetched successfully',
        success: true,
        data: planEntities,
      };
    } catch (error) {
      console.log(error.message);

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
      console.log('planEntities:', planEntities);

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

  update(id: string, updatePlanInput: UpdatePlanInput) {}

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
