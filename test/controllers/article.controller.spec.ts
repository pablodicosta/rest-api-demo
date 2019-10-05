import 'mocha';
import { expect } from 'chai';
import { mock, when, instance, anyOfClass, verify } from 'ts-mockito';
import { ArticleController } from '../../src/controllers/article.controller';
import { ArticleService } from '../../src/services/article.service';
import { Article } from '../../src/model/article.model';

describe('ArticleController', () => {

  const articleService = mock(ArticleService);
  const articleController = new ArticleController(instance(articleService));

  const tags = ['tag1', 'tag2'];
  const articleId = '123456';
  const article: Article = {
    userId: 'asdfghh',
    title: 'test title',
    text: 'zxcvbn',
    tags
  };

  it('should get an Article list on GET', () => {
    when(articleService.getArticles(anyOfClass(Array))).thenReturn([ article ]);
    const res = articleController.getArticles(tags);
    expect(res).to.be.deep.equal([ article ]);
    verify(articleService.getArticles(tags));
  });

  it('should get an Article id on POST', () => {
    when(articleService.createArticle(article)).thenReturn(articleId);
    const res = articleController.createArticle(article);
    expect(res).to.be.equal(articleId);
    verify(articleService.createArticle(article));
  });

  it('should get an Article id on PUT', () => {
    when(articleService.editArticle(articleId, article)).thenReturn(articleId);
    const res = articleController.editArticle(articleId, article);
    expect(res).to.be.equal(articleId);
    verify(articleService.editArticle(articleId, article));
  });

  it('should get an Article id on DELETE', () => {
    articleController.deleteArticle(articleId);
    verify(articleService.deleteArticle(articleId));
  });

});
