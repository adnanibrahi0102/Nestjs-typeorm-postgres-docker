import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { PlanService, User } from '@prisma/client';
import { CreateAuthInput } from 'src/auth/dto/createAuthInput';
import { CreateServiceInput } from 'src/service/dto/create-service.input';

@InputType()
export class CreatePlanInput {
  @Field()
  name: string;

  @Field()
  features: string;

  @Field(() => Float)
  price: number;

  @Field(() => [CreateAuthInput], { nullable: true })
  users?: CreateAuthInput[];

  @Field(() => [CreateServiceInput], { nullable: true })
  services?: CreateServiceInput[];
}
