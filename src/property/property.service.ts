import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRespositry: Repository<Property>,
  ) {}

  async findAll(): Promise<Property[]> {
    return await this.propertyRespositry.find();
  }

  async findOne(id: number): Promise<Property | null> {
    return await this.propertyRespositry.findOne({
      where: { id },
    });
  }

  async createProperty(property: Property): Promise<Property> {
    const newProperty = this.propertyRespositry.create(property);
    return await this.propertyRespositry.save(newProperty);
  }

  async updateProperty(id: number, property: Property): Promise<Property> {
    const updateProperty = await this.propertyRespositry.findOne({
      where: { id },
    });
    const updatedProperty = { ...updateProperty, ...property };
    return await this.propertyRespositry.save(updatedProperty);
  }

  async deleteProperty(id: number): Promise<void> {
    await this.propertyRespositry.delete({ id });
  }
}
