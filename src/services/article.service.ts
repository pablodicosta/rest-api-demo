import { Article } from '../model/article.model';

export class ArticleService {

  getArticles(tags: string[]): Article[] {
    return [];
  }

  createArticle(article: Article): string {
    return '123456';
  }

  editArticle(id: string, article: Article): string {
    return id;
  }

  deleteArticle(id: string): void {
    return;
  }

}
