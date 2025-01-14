import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
    constructor(private readonly prisma : PrismaService){}

    async createUser(UserInput : CreateUserInput){
        return await this.prisma.user.create({data : UserInput});
    }

    async getUserById(id : number) {
        return await this.prisma.user.findUnique({where:{id}});
    }
}
