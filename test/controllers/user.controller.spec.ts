import 'mocha';
import { expect } from 'chai';
import { mock, when, instance, verify } from 'ts-mockito';
import { UserController } from '../../src/controllers/user.controller';
import { UserService } from '../../src/services/user.service';
import { User } from '../../src/model/user.model';

describe('UserController', () => {

  const userService = mock(UserService);
  const userController = new UserController(instance(userService));

  const userId = '123456';
  const user: User = {
    name: 'Bob Tester',
    avatar: 'http://avatar.com'
  };

  it('should create a user on POST', () => {
    when(userService.createUser(user)).thenReturn(userId);
    const res = userController.createUser(user);
    expect(res).to.be.equal(userId);
    verify(userService.createUser(user));
  });

});
