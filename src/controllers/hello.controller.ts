import { Controller, Get } from 'routing-controllers';

@Controller('/hello')
export class HelloController {

  @Get()
  getHelloMessage() {
    return 'Hello!';
  }

}