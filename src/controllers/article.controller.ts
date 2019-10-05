import { JsonController, Get, QueryParam, Post,
        Body, Put, Param, Delete, InternalServerError,
        Req, Res, HttpError, HttpCode, NotFoundError } from 'routing-controllers';
import { Article } from '../model/article.model';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';
import { DuplicatedError } from '../errors/duplicated.error';
import * as HttpStatus from 'http-status-codes';
import { Response, Request } from 'express';

@JsonController('/article')
export class ArticleController {

  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  @Get()
  async getArticles(@QueryParam('tag') tags: string[]) {
    try {
      return await this.articleService.getArticles(tags);
    } catch (err) {
      throw new InternalServerError(err.message);
    }
  }

  @Post()
  async createArticle(@Body() article: Article, @Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.userService.getUser(article.userId);
      if (user) {
        const id = await this.articleService.createArticle(article);
        res.setHeader('Location', `${req.originalUrl}/${id}`);
        return HttpCode(HttpStatus.CREATED);
      } else {
        throw new NotFoundError(`User ${article.userId} not found`);
      }
    } catch (err) {
      if (err instanceof DuplicatedError) {
        throw new HttpError(HttpStatus.CONFLICT, err.message);
      } else {
        throw err;
      }
    }
  }

  @Put('/:id')
  async editArticle(@Param('id') id: string, @Body() article: Article) {
    try {
      const art = await this.articleService.getArticle(id);
      if (!art) {
        throw new NotFoundError(`Article ${id} not found`);
      }
      const user = await this.userService.getUser(article.userId);
      if (user) {
        await this.articleService.editArticle(id, article);
        return HttpCode(HttpStatus.OK);
      } else {
        throw new NotFoundError(`User ${article.userId} not found`);
      }
    } catch (err) {
      throw err;
    }
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: string) {
    try {
      const deletedCount = await this.articleService.deleteArticle(id);
      if (deletedCount === 0) {
        throw new NotFoundError(`Article ${id} not found`);
      }
      return HttpCode(HttpStatus.OK);
    } catch (err) {
      throw err;
    }
  }

}
