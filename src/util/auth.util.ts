import { Action } from 'routing-controllers';
import config from 'config';

export class AuthUtil {

  static async checkToken(action: Action) {
    const requestToken = action.request.headers.authorization;
    const token = `Bearer ${config.get('apiToken')}`;
    return requestToken && (requestToken === token);
  }

}
