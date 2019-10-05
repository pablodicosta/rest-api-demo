import { expect } from 'chai';
import { HelloController } from '../../src/controllers/hello.controller';
import 'mocha';

describe('HelloController', () => {
  it('should return message on GET', () => {
    const helloController = new HelloController();
    const res = helloController.getHelloMessage();
    expect(res).to.be.equal('Hello!');
  });
});
