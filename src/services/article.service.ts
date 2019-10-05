import { Article } from '../model/article.model';
import Container from 'typedi';
import { Connection } from 'mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { getModelForClass } from '@typegoose/typegoose';
import { MongoError } from 'mongodb';
import { DuplicatedError } from '../errors/duplicated.error';

export class ArticleService {

  private ArticleModel: ModelType<Article>;

  constructor() {
    try {
      const dbConnection = Container.get<Connection>('dbConnection');
      this.ArticleModel = getModelForClass(Article, { existingConnection: dbConnection });
    } catch (err) {
      console.error(err);
    }
  }

  async getArticle(id: string): Promise<Article | null> {
    try {
      return await this.ArticleModel.findById(id).lean().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getArticles(tags: string[]): Promise<Article[]> {
    try {
      return await this.ArticleModel.find({
        tags: { $in: tags }
      }).lean().exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async createArticle(article: Article): Promise<string | undefined> {
    try {
      const newArticle: Article = await this.ArticleModel.create(article);
      return newArticle._id;
    } catch (err) {
      if (err instanceof MongoError && err.code === 11000) {
        throw new DuplicatedError(article.title);
      } else {
        throw new Error(err);
      }
    }
  }

  async editArticle(_id: string, article: Article): Promise<void> {
    try {
      await this.ArticleModel.updateOne({ _id }, article);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteArticle(_id: string): Promise<number | undefined> {
    try {
      const { deletedCount } = await this.ArticleModel.deleteOne({ _id });
      return deletedCount;
    } catch (err) {
      throw new Error(err);
    }
  }

}
