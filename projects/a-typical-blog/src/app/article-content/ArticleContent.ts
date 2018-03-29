import { Component, Input } from '@angular/core';

@Component({
  selector: 'article[article-content]',
  templateUrl: './ArticleContent.html',
  styleUrls: ['./ArticleContent.scss']
})
export class ArticleContent {
  @Input('article-content') article;
}