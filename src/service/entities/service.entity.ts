import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
