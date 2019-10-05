import { mongoose } from '@typegoose/typegoose';

export class DatabaseUtil {

  static async getDbConnection(host: string, port: number, database: string, user: string, pass: string) {
    return await mongoose.createConnection(`mongodb://${host}:${port}/${database}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      authSource: 'admin',
      user,
      pass
    });
  }

}
