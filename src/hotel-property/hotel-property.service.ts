import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelPropertyInput } from './dto/create-hotel-property.input';
import { UpdateHotelPropertyInput } from './dto/update-hotel-property.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class HotelPropertyService {
  constructor(private readonly prismaService: PrismaService) {}
  async createHotelPropertyService(
    createHotelPropertyInput: CreateHotelPropertyInput & { userId: string },
  ) {
    try {
      const requiredFields = [
        'hotelName',
        'hotelAddress',
        'city',
        'state',
        'zipCode',
        'country',
        'phoneNumber',
        'email',
      ];

      for (const field of requiredFields) {
        if (!createHotelPropertyInput[field]) {
          throw new BadRequestException(`Missing required field: ${field}`);
        }
      }

      const existingHotelProperty =
        await this.prismaService.hotelProperty.findUnique({
          where: { email: createHotelPropertyInput.email },
        });

      if (existingHotelProperty) {
        throw new BadRequestException('Hotel property already exists');
      }

      await this.prismaService.hotelProperty.create({
        data: {
          hotelName: createHotelPropertyInput.hotelName,
          hotelAddress: createHotelPropertyInput.hotelAddress,
          city: createHotelPropertyInput.city,
          state: createHotelPropertyInput.state,
          zipCode: createHotelPropertyInput.zipCode,
          country: createHotelPropertyInput.country ?? 'India',
          phoneNumber: createHotelPropertyInput.phoneNumber,
          email: createHotelPropertyInput.email,
          websiteURL: createHotelPropertyInput.websiteURL || null,
          logo: createHotelPropertyInput.logo || null,
          description:
            createHotelPropertyInput.description || 'No description provided.',
          hotelImages: createHotelPropertyInput.hotelImages ?? [],
          uniqueIdentificationPhotoCopy:
            createHotelPropertyInput.uniqueIdentificationPhotoCopy,
          userId: createHotelPropertyInput.userId, // Automatically assigned from cookies
          checkInTime: createHotelPropertyInput.checkInTime ?? '14:00',
          checkOutTime: createHotelPropertyInput.checkOutTime ?? '12:00',
          latitude: createHotelPropertyInput.latitude ?? null,
          longitude: createHotelPropertyInput.longitude ?? null,
          socialMedia: createHotelPropertyInput.socialMedia || null,
          avgRating: createHotelPropertyInput.avgRating ?? 0.0,
        },
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Hotel property created successfully',
        success: true,
      };
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  getPropertyOfVendorService() {
     try {
       
     } catch (error) {
      
     }
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelProperty`;
  }

  update(id: number, updateHotelPropertyInput: UpdateHotelPropertyInput) {
    return `This action updates a #${id} hotelProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelProperty`;
  }
}
