import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HotelProperty {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}


@ObjectType()
export class CreateHotelPropertyResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;
}