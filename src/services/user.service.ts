import { User } from '../model/user.model';

export class UserService {

  createUser(user: User) {
    user._id = '123123';
    return user._id;
  }

}
