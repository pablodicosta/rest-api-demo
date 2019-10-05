import { expect } from 'chai';
import { mock, when, instance } from 'ts-mockito';
import 'mocha';
import { UserController } from '../../src/controllers/user.controller';
import { UserService } from '../../src/services/user.service';
import { User } from '../../src/model/user.model';

describe('UserController', () => {
  it('should create a user on POST', () => {
    const userService = mock(UserService);
    const userController = new UserController(instance(userService));

    const user: User = {
      name: 'Bob Tester',
      avatar: 'http://avatar.com'
    }

    when(userService.createUser(user)).thenReturn('123456');

    const res = userController.createUser(user);
    
    expect(res).to.be.eq('123456');
  });
});