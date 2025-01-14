import { Resolver , Query , Mutation , Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
@Resolver(()=>User)
export class UserResolver {
    constructor(private readonly userService : UserService){}

    @Mutation(() => User)
    createUser(@Args("createUserInput")createUserInput : CreateUserInput){
        return this.userService.createUser(createUserInput);
    }

    @Query(()=> User)
    getUserById(@Args("id")id : number){
        return this.userService.getUserById(id);
    }
}
