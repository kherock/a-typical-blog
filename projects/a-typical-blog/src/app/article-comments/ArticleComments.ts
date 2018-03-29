import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-comments',
  templateUrl: './ArticleComments.html',
  styleUrls: ['./ArticleComments.scss'],
})
export class ArticleComments {
  @Input() comments = [
    {
      author: 'someguy',
      date: new Date(),
      body: 'hello',
    }
  ]
}