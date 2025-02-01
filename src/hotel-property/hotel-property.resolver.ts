import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { HotelPropertyService } from './hotel-property.service';
import {
  CreateHotelPropertyResponse,
  HotelProperty,
} from './entities/hotel-property.entity';
import { CreateHotelPropertyInput } from './dto/create-hotel-property.input';
import { UpdateHotelPropertyInput } from './dto/update-hotel-property.input';
import * as jwt from 'jsonwebtoken';
@Resolver(() => HotelProperty)
export class HotelPropertyResolver {
  constructor(private readonly hotelPropertyService: HotelPropertyService) {}

  @Mutation(() => CreateHotelPropertyResponse)
  createHotelProperty(
    @Args('createHotelPropertyInput')
    createHotelPropertyInput: CreateHotelPropertyInput,
    @Context() context: any,
  ) {
    const user = jwt.verify(
      context.req.cookies.access_token,
      process.env.JWT_SECRET,
    );
    const userId = user.id;
    return this.hotelPropertyService.createHotelPropertyService({
      ...createHotelPropertyInput,
      userId,
    });
  }

  @Query(() => [HotelProperty], { name: 'hotelProperty' })
  findAll() {
    return this.hotelPropertyService.getPropertyOfVendorService();
  }

  @Query(() => HotelProperty, { name: 'hotelProperty' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hotelPropertyService.findOne(id);
  }

  @Mutation(() => HotelProperty)
  updateHotelProperty(
    @Args('updateHotelPropertyInput')
    updateHotelPropertyInput: UpdateHotelPropertyInput,
  ) {
    return this.hotelPropertyService.update(
      updateHotelPropertyInput.id,
      updateHotelPropertyInput,
    );
  }

  @Mutation(() => HotelProperty)
  removeHotelProperty(@Args('id', { type: () => Int }) id: number) {
    return this.hotelPropertyService.remove(id);
  }
}
