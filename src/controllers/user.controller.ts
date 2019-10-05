import { Post, Body, JsonController, InternalServerError,
        HttpError, Res, Req, HttpCode, Authorized } from 'routing-controllers';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { DuplicatedError } from '../errors/duplicated.error';
import * as HttpStatus from 'http-status-codes';
import { Response, Request } from 'express';

@Authorized()
@JsonController('/user')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @Post()
  async createUser(@Body() user: User, @Req() req: Request, @Res() res: Response) {
    try {
      const id = await this.userService.createUser(user);
      res.setHeader('Location', `${req.originalUrl}/${id}`);
      return HttpCode(HttpStatus.CREATED);
    } catch (err) {
      if (err instanceof DuplicatedError) {
        throw new HttpError(HttpStatus.CONFLICT, err.message);
      } else {
        throw new InternalServerError(err.message);
      }
    }
  }

}
