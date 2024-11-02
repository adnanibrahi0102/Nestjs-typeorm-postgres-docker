import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespositry: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.usersRespositry.find();
  }

  async findOneUser(id : number): Promise<User> {
    return await this.usersRespositry.findOne({
        where : {id}
    })
}

  async createUser(user :User) : Promise<User> {
    const newUser = await this.usersRespositry.create(user);
    return await this.usersRespositry.save(newUser);
  }

  async updateUser(id : number , user : User) :Promise<User>{
    const updateUser = await this.usersRespositry.findOne({where : {id}});
    const updatedUser = {...updateUser , ...user};
    return await this.usersRespositry.save(updateUser);
  }

  async deleteUser(id : number) : Promise<void>{
    await this.usersRespositry.delete({id})
  }
}