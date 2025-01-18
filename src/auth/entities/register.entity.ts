import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RegisterVendorResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;
}
@ObjectType()
class UserData {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  vendorName: string;

  @Field()
  phoneNumber: string;

  @Field()
  vendorId: string;
}

@ObjectType()
export class LoginVendorResponse {
  @Field()
  status: number;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => UserData)
  data: UserData;
}
