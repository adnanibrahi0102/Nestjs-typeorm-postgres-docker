import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { PrismaService } from 'prisma/prisma.service';
import { ServiceEntity } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService : PrismaService){}
  async create(createServiceInput: CreateServiceInput) {
     const {name , description , planIds} = createServiceInput;

     if (!name || !description || !planIds){
      throw new HttpException('Missing required fields', 400);
     }
     try {
      const service =await this.prismaService.service.create({
        data : {
          name,
          description,
          plans: {
            create: planIds.map(planId => ({
              plan: {
                connect: {
                  id: planId
                }
              }
            }))
          }
          
        },
        include:{plans : true}
      })
      if (!service){
        console.log('Service not created');
        throw new HttpException('Service not created', 500);
      }
      return {
        message : 'Service created successfully',
        success : true,
        status : 201,
        
      }
     } catch (error) {
        console.log(error);
        throw new HttpException(error.message, 500);
     }
  }

  async findAllServices() {
     try {
      const services = await this.prismaService.service.findMany({})
      if (services.length === 0){
        return {
          message : 'No services found',
          success : true,
          status : 200,
          data : []
        }
      }
      const AllServices : ServiceEntity[] = services.map(service => ({
        id : service.id,
        name : service.name,
        description : service.description,
        createdAt : service.createdAt
      }))
      return {
        message : 'Services found',
        success : true,
        status : 200,
        data : AllServices
      }

     } catch (error) {
       console.log(error,"error in finding all services");
       throw new HttpException(error.message, 500);
     }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceInput: UpdateServiceInput) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
