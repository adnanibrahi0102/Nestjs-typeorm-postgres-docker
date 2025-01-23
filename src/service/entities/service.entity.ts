import { ObjectType, Field} from '@nestjs/graphql';

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
export class ServiceResponseForDelete {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;
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

@ObjectType()
export class ServiceResponseForUpdate {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => ServiceEntity, { nullable: true })
  data?: ServiceEntity; // Includes updated service details, nullable for flexibility
}