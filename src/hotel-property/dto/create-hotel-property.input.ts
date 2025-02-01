import { InputType, Field, Float } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
@InputType()
export class CreateHotelPropertyInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  hotelName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  hotelAddress: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  state: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @Field({ defaultValue: "India" })
  @IsString()
  @IsNotEmpty()
  country?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: true })

  websiteURL?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field()
  description: string;

  @Field(() => [String])
  hotelImages: string[];

  @Field()
  uniqueIdentificationPhotoCopy: string;

  @Field({ defaultValue: "14:00" })
  checkInTime?: string;

  @Field({ defaultValue: "12:00" })
  checkOutTime?: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => String, { nullable: true })
  socialMedia?: string;

  @Field(() => Float, { defaultValue: 0.0 })
  avgRating?: number;
}
