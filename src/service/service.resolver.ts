import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import {
  ServiceFindOneResponse,
  ServiceResponse,
  ServiceResponseForDelete,
  ServiceResponseForUpdate,
} from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { CreatePlanResponse } from 'src/plan/entities/plan.entity';

@Resolver()
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => CreatePlanResponse)
  createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.create(createServiceInput);
  }

  @Query(() => ServiceResponse)
  findAllServices() {
    return this.serviceService.findAllServices();
  }

  @Query(() => ServiceFindOneResponse)
  findOneService(@Args('id', { type: () => String }) id: string) {
    return this.serviceService.findOneService(id);
  }

  @Mutation(() => ServiceResponseForUpdate)
  updateService(
    @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
  ) {
    return this.serviceService.updateService(
      updateServiceInput.id,
      updateServiceInput,
    );
  }

  @Mutation(() => ServiceResponseForDelete)
  deleteService(@Args('id') id: string) {
    return this.serviceService.deleteService(id);
  }
}
