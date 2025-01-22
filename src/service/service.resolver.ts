import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { ServiceEntity, ServiceResponse } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { CreatePlanResponse } from 'src/plan/entities/plan.entity';

@Resolver()
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => CreatePlanResponse)
  createService(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
    return this.serviceService.create(createServiceInput);
  }

  @Query(() => ServiceResponse)
  findAllServices() {
    return this.serviceService.findAllServices();
  }

  // @Query(() => Service, { name: 'service' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.serviceService.findOne(id);
  // }

  // @Mutation(() => Service)
  // updateService(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput) {
  //   return this.serviceService.update(updateServiceInput.id, updateServiceInput);
  // }

  // @Mutation(() => Service)
  // removeService(@Args('id', { type: () => Int }) id: number) {
  //   return this.serviceService.remove(id);
  // }
}
