import { IsOptional, IsString } from 'class-validator';
import { CreateServiceInput } from './create-service.input';
import { InputType, Field,  PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  /**
   * The unique identifier of the service to update.
   */
  @Field(() => String)
  @IsString()
  @IsOptional() // Allows flexibility for partial updates
  id: string;
}
