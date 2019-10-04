import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { controllers } from './controllers';

const port = 3000;
const app = createExpressServer({ controllers });

app.listen(port, () => {
  console.info(`Server running at port ${port}`);
});