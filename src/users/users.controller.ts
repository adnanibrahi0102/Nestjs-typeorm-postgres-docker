import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAllUsers();
  }

  @Get('id')
  async findOneUser(id: number): Promise<User> {
    return await this.usersService.findOneUser(id);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Patch('id')
  async updateUser(@Param('id') id: number, @Body() user: User): Promise<User> {
    return await this.usersService.updateUser(id, user);
  }

  @Delete('id')
  async deleteUser(@Param('id') id : number) : Promise<void>{
    await this.usersService.deleteUser(id);
  }
}
