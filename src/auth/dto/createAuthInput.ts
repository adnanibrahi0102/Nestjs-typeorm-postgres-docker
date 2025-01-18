import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { userRole } from '@prisma/client';
@InputType()
export class CreateAuthInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @Field()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  vendorName: string;

  @Field()
  @IsString()
  phoneNumber: string;
}
