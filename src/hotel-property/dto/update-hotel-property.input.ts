import { CreateHotelPropertyInput } from './create-hotel-property.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHotelPropertyInput extends PartialType(CreateHotelPropertyInput) {
  @Field(() => Int)
  id: number;
}
