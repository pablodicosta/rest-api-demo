import { Post, Body, JsonController } from 'routing-controllers';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@JsonController('/user')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @Post()
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

}
