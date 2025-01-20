import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CreatePlanResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;
}

@ObjectType()
export class PlanEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  features: string;

  @Field()
  price: number;
}
@ObjectType()
export class PlanFindAllResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => [PlanEntity])
  data: PlanEntity[];
}
@ObjectType()
export class PlanFindOneResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => PlanEntity)
  data: PlanEntity;
}
