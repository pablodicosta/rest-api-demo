import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { controllers } from './controllers';
import { Container } from 'typedi';

useContainer(Container);

const port = 3000;
const app = createExpressServer({ controllers });

app.listen(port, () => {
  console.info(`Server running at port ${port}`);
});