import 'mocha';
import { expect } from 'chai';
import { mock, when, instance, verify } from 'ts-mockito';
import { UserController } from '../../src/controllers/user.controller';
import { UserService } from '../../src/services/user.service';
import { User } from '../../src/model/user.model';
import { mockRequest, mockResponse } from 'mock-req-res';
import sinonChai = require('sinon-chai');
import chai = require('chai');

chai.use(sinonChai);

describe('UserController', () => {

  const userPath = '/api/user';
  const userService = mock(UserService);
  const req = mockRequest({ originalUrl: userPath });
  const res = mockResponse();
  const userController = new UserController(instance(userService));

  const userId = '123456';
  const user: User = {
    name: 'Bob Tester',
    avatar: 'http://avatar.com'
  };

  when(userService.createUser(user)).thenResolve(userId);

  it('should create a user on POST', async () => {
    await userController.createUser(user, req, res);
    expect(res.setHeader).to.have.been.calledWith('Location', `${userPath}/${userId}`);
    verify(userService.createUser(user));
  });

});
