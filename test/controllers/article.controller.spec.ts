import 'mocha';
import { expect } from 'chai';
import { mock, when, instance, anyOfClass, verify } from 'ts-mockito';
import { ArticleController } from '../../src/controllers/article.controller';
import { ArticleService } from '../../src/services/article.service';
import { Article } from '../../src/model/article.model';
import { UserService } from '../../src/services/user.service';
import { mockRequest, mockResponse } from 'mock-req-res';
import { HttpCode } from 'routing-controllers';
import { OK } from 'http-status-codes';
import { User } from '../../src/model/user.model';

describe('ArticleController', () => {

  const articlePath = '/api/article';
  const articleService = mock(ArticleService);
  const userService = mock(UserService);
  const req = mockRequest({ originalUrl: articlePath });
  const res = mockResponse();
  const articleController = new ArticleController(instance(articleService), instance(userService));

  const tags = ['tag1', 'tag2'];
  const userId = 'abc1234';
  const articleId = '123456';
  const article: Article = {
    userId,
    title: 'test title',
    text: 'testing',
    tags
  };

  when(articleService.getArticles(anyOfClass(Array))).thenResolve([ article ]);
  when(articleService.getArticle(articleId)).thenResolve(article);
  when(articleService.createArticle(article)).thenResolve(articleId);
  when(articleService.editArticle(articleId, article)).thenResolve();
  when(userService.getUser(userId)).thenResolve(new User());

  it('should get an Article list on GET', async () => {
    const result = await articleController.getArticles(tags);
    expect(result).to.be.deep.equal([ article ]);
    verify(articleService.getArticles(tags));
  });

  it('should get an Article id on POST', async () => {
    await articleController.createArticle(article, req, res);
    expect(res.setHeader).to.have.been.calledWith('Location', `${articlePath}/${articleId}`);
    verify(articleService.createArticle(article));
  });

  it('should get an Article id on PUT', async () => {
    const result = await articleController.editArticle(articleId, article);
    verify(articleService.editArticle(articleId, article));
  });

  it('should get an Article id on DELETE', async () => {
    await articleController.deleteArticle(articleId);
    verify(articleService.deleteArticle(articleId));
  });

});
