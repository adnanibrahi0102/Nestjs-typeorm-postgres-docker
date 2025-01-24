import { CreatePlanInput } from './create-plan.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdatePlanInput extends PartialType(CreatePlanInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  features?: string;

  @Field(() => Float, { nullable: true })
  price?: number;
}
