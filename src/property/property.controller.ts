import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get('all')
  async findAllProperties(): Promise<Property[]> {
    return await this.propertyService.findAll();
  }

  @Get('id')
  async findOneProperty(@Param('id') id: number): Promise<Property> {
    return await this.propertyService.findOne(id);
  }

  @Post('create')
  async createProperty(@Body() property: Property): Promise<Property> {
    return await this.propertyService.createProperty(property);
  }

  @Patch('update/:id')
  async updateProperty(
    @Param('id') id: number,
    @Body() property: Property,
  ): Promise<Property> {
    return await this.propertyService.updateProperty(id, property);
  }

  @Delete('delete/:id')
  async deleteProperty(@Param('id') id: number): Promise<void> {
    return await this.propertyService.deleteProperty(id);
  }
}
