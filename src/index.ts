import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { controllers } from './controllers';
import { Container } from 'typedi';
import { DatabaseUtil } from './util/database.util';
import config from 'config';
import { AuthUtil } from './util/auth.util';

process.env.NODE_CONFIG_DIR = './backend/config';

useContainer(Container);

const dbConfig: any = config.get('database');
const port = 3000;
const app = createExpressServer({
  controllers,
  routePrefix: '/api',
  authorizationChecker: AuthUtil.checkToken
});

app.listen(port, async () => {
  try {
    const dbConnection = await DatabaseUtil.getDbConnection(
      dbConfig.host,
      dbConfig.port,
      dbConfig.database,
      dbConfig.username,
      dbConfig.password
    );
    Container.set('dbConnection', dbConnection);
    console.info(`Server running at port ${port}`);
  } catch (err) {
    console.error(err);
  }
});
