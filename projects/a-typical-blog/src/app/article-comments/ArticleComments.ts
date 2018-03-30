import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { ArticleComment } from '../core/ArticleService';

@Component({
  selector: 'article-comments',
  templateUrl: './ArticleComments.html',
  styleUrls: ['./ArticleComments.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: '0', transform: 'scale(0.9)' })),
      transition(':enter', [
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style('*')),
      ]),
    ])
  ],
})
export class ArticleComments {
  @Input() comments: ArticleComment[];
}
