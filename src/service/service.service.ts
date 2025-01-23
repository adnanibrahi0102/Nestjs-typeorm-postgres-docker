import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { PrismaService } from 'prisma/prisma.service';
import {
  ServiceEntity,
  ServiceResponseForUpdate,
} from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new service with associated plans.
   *
   * @param createServiceInput - The input data for creating a service, including:
   *   - `name` (string): Name of the service.
   *   - `description` (string): Description of the service.
   *   - `planIds` (string[]): Array of plan IDs to associate with the service.
   * @returns A success message with status code and operation status.
   * @throws HttpException if required fields are missing or if the creation fails.
   */
  async create(createServiceInput: CreateServiceInput) {
    const { name, description, planIds } = createServiceInput;

    if (!name || !description || !planIds) {
      throw new HttpException('Missing required fields', 400);
    }

    try {
      const service = await this.prismaService.service.create({
        data: {
          name,
          description,
          plans: {
            create: planIds.map((planId) => ({
              plan: { connect: { id: planId } },
            })),
          },
        },
        include: { plans: true },
      });

      if (!service) {
        throw new HttpException('Service not created', 500);
      }

      return {
        message: 'Service created successfully',
        success: true,
        status: 201,
      };
    } catch (error) {
      console.error('Error creating service:', error);
      throw new HttpException(error.message, 500);
    }
  }

  /**
   * Fetches all services from the database.
   *
   * @returns An object containing a success message, status code, and a list of all services.
   *   If no services are found, returns an empty array with a success message.
   * @throws HttpException if an error occurs while fetching services.
   */
  async findAllServices() {
    try {
      const services = await this.prismaService.service.findMany();

      if (services.length === 0) {
        return {
          message: 'No services found',
          success: true,
          status: 200,
          data: [],
        };
      }

      const allServices: ServiceEntity[] = services.map((service) => ({
        id: service.id,
        name: service.name,
        description: service.description,
        createdAt: service.createdAt,
      }));

      return {
        message: 'Services found',
        success: true,
        status: 200,
        data: allServices,
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new HttpException(error.message, 500);
    }
  }

  /**
   * Fetches a specific service by its ID.
   *
   * @param id - The unique identifier of the service.
   * @returns An object containing a success message, status code, and the service data.
   *   If the service is not found, returns an empty service entity with a success message.
   * @throws HttpException if the ID is invalid or the fetch operation fails.
   */
  async findOneService(id: string) {
    if (!id || typeof id !== 'string') {
      throw new HttpException('Invalid id or id not provided', 400);
    }

    try {
      const service = await this.prismaService.service.findUnique({
        where: { id },
      });

      if (!service) {
        return {
          message: 'Service not found',
          success: true,
          status: 200,
          data: new ServiceEntity(),
        };
      }

      return {
        message: 'Service found',
        success: true,
        status: 200,
        data: {
          id: service.id,
          name: service.name,
          description: service.description,
          createdAt: service.createdAt,
        },
      };
    } catch (error) {
      console.error('Error fetching service:', error);
      throw new HttpException(error.message, 500);
    }
  }

  /**
   * Updates a service's details.
   *
   * @param id - The unique identifier of the service to be updated.
   * @param updateServiceInput - The input data for updating the service.
   * @returns A placeholder message for updating a service.
   * @note This method is currently a stub and should be implemented.
   */
  async updateService(id: string, updateServiceInput: UpdateServiceInput) {
    if (!id || typeof id !== 'string') {
      throw new HttpException('Invalid id or id not provided', 400);
    }

    const { name, description, planIds } = updateServiceInput;

    try {
      const isServiceExist = await this.prismaService.service.findUnique({
        where: { id },
      });
  
      if (!isServiceExist) {
        throw new HttpException('Service not found', 404);
      }

      const updatedService = await this.prismaService.service.update({
        where: { id },
        data: {
          name: name || isServiceExist.name,
          description: description || isServiceExist.description,
          plans: planIds
            ? {
                set: [], // Clear existing plans
                create: planIds.map((planId) => ({
                  plan: { connect: { id: planId } },
                })),
              }
            : undefined, // Retain existing plans if not provided
        },
      });
      return {
        status: 200,
        message: 'Service updated successfully',
        success: true,
        data: {
          id: updatedService.id,
          name: updatedService.name,
          description: updatedService.description,
          createdAt: updatedService.createdAt,
        },
      } as ServiceResponseForUpdate;
    } catch (error) {
      console.error('Error updating service:', error);
      throw new HttpException(error.message, 500);
    }
  }

  /**
   * Deletes a service and its related PlanService records, if any.
   *
   * Validates the provided service ID, checks for any related records in the PlanService table,
   * and removes them before deleting the service itself to prevent foreign key constraint violations.
   *
   * @param id - The unique identifier of the service to be deleted.
   * @returns An object containing a success message, status code, and operation status.
   * @throws HttpException if the service ID is invalid, the deletion fails, or any errors occur during the process.
   */
  async deleteService(id: string) {
    if (!id || typeof id !== 'string') {
      throw new HttpException('Invalid id or id not provided', 400);
    }

    try {
      const relatedRecords = await this.prismaService.planService.findMany({
        where: { serviceId: id },
      });

      if (relatedRecords.length > 0) {
        await this.prismaService.planService.deleteMany({
          where: { serviceId: id },
        });
      }

      const response = await this.prismaService.service.delete({
        where: { id },
      });

      if (!response) {
        throw new HttpException('Service not deleted', 500);
      }

      return {
        message: 'Service deleted successfully',
        success: true,
        status: 200,
      };
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new HttpException(error.message, 500);
    }
  }
}
