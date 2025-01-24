import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlanService } from './plan.service';

import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import {
  CreatePlanResponse,
  PlanFindAllResponse,
  PlanFindOneResponse,
} from './entities/plan.entity';

@Resolver()
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Mutation(() => CreatePlanResponse)
  createPlan(@Args('createPlanInput') createPlanInput: CreatePlanInput) {
    return this.planService.createPlan(createPlanInput);
  }

  @Query(() => PlanFindAllResponse)
  findAllPlans() {
    return this.planService.findAllPlans();
  }

  @Query(() => PlanFindOneResponse)
  findOnePlan(@Args('id') id: string) {
    return this.planService.findOnePlan(id);
  }

  @Mutation(() => CreatePlanResponse)
  updatePlan(@Args('updatePlanInput') updatePlanInput: UpdatePlanInput) {
    return this.planService.update(updatePlanInput.id, updatePlanInput);
  }

  @Mutation(() => CreatePlanResponse)
  removePlan(@Args('id') id: string) {
    return this.planService.remove(id);
  }
}
