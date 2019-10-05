import 'reflect-metadata';
import { createExpressServer, useContainer, getMetadataArgsStorage } from 'routing-controllers';
import { controllers } from './controllers';
import { Container } from 'typedi';
import { DatabaseUtil } from './util/database.util';
import config from 'config';
import { AuthUtil } from './util/auth.util';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as express from 'express';

process.env.NODE_CONFIG_DIR = './backend/config';
const dbConfig: any = config.get('database');
const port = config.get('appPort');
useContainer(Container);

// Server configuration
const routingControllersOptions = {
  controllers,
  routePrefix: '/api',
  authorizationChecker: AuthUtil.checkToken
};

// OpenAPI docs configuration
const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas/'
});
const storage: any = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        scheme: 'bearer',
        type: 'http'
      }
    }
  },
  info: {
    description: 'REST API demo using NodeJS, Typescript, Express and MongoDB',
    title: 'api-demo',
    version: '1.0.0'
  }
});

const app = createExpressServer(routingControllersOptions);

// Swagger UI configuration
app.get('/docs/json', (req: any, res: any) => {
  res.json(spec);
});
app.use( '/docs/swagger', express.static( 'swagger' ) );
app.use( '/docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ) );

// Start server and connect to database
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
