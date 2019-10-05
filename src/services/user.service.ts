import { User } from '../model/user.model';
import { getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Connection } from 'mongoose';
import Container, { Service } from 'typedi';
import { DuplicatedError } from '../errors/duplicated.error';
import { MongoError } from 'mongodb';

@Service()
export class UserService {

  private UserModel: ModelType<User>;

  constructor() {
    try {
      const dbConnection = Container.get<Connection>('dbConnection');
      this.UserModel = getModelForClass(User, { existingConnection: dbConnection });
    } catch (err) {
      console.error(err);
    }
  }

  async getUser(id: string): Promise<User | null> {
    try {
      return await this.UserModel.findById(id).lean().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUser(user: User): Promise<string | undefined> {
    try {
      const newUser: User = await this.UserModel.create(user);
      return newUser._id;
    } catch (err) {
      if (err instanceof MongoError && err.code === 11000) {
        throw new DuplicatedError(user.name);
      } else {
        throw new Error(err);
      }
    }
  }

}
