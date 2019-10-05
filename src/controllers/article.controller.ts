import { JsonController, Get, QueryParam, Post,
        Body, Put, Param, Delete } from 'routing-controllers';
import { Article } from '../model/article.model';
import { ArticleService } from '../services/article.service';

@JsonController('/article')
export class ArticleController {

  constructor(
    private articleService: ArticleService
  ) {}

  @Get()
  getArticles(@QueryParam('tag') tags: string[]) {
    return this.articleService.getArticles(tags);
  }

  @Post()
  createArticle(@Body() article: Article) {
    return this.articleService.createArticle(article);
  }

  @Put('/:id')
  editArticle(@Param('id') id: string, @Body() article: Article) {
    return this.articleService.editArticle(id, article);
  }

  @Delete('/:id')
  deleteArticle(@Param('id') id: string) {
    return id;
  }

}
