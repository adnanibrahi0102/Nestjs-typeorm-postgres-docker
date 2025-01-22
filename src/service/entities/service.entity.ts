import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ServiceEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class ServiceResponse {
  
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => [ServiceEntity])
  data: ServiceEntity[];
}

@ObjectType()
export class ServiceFindOneResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => ServiceEntity)
  data: ServiceEntity;
}
