import { InputType, Field  } from '@nestjs/graphql';
import { IsString , IsArray } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [String])
  @IsArray()
  planIds : string[];

  
}
