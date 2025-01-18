import { ObjectType, Field } from '@nestjs/graphql';
import { userRole } from '@prisma/client';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field(() => userRole)
  role: userRole;

  @Field()
  vendorName: string;

  @Field()
  vendorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
