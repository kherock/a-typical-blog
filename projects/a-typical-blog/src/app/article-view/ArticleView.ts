import { Component, OnDestroy, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, map, share, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ArticleService } from '../core/ArticleService';
import { AppRoot } from '../app-root';

@Component({
  selector: 'article-view',
  templateUrl: './ArticleView.html',
  styleUrls: ['./ArticleView.scss'],
  host: {
    '[class.dark-theme]': 'appRoot.isDarkTheme'
  },
})
export class ArticleView implements OnDestroy {

  commentForm = new FormGroup({
    delta: new FormControl(null, Validators.required)
  });

  articlePath$ = this.route.params.pipe(
    map(params => `/${params.year}/${params.month}/${params.articleName}`),
    tap(() => this.showComments = false),
    shareReplay(1),
  );

  articleRequest$ = this.articlePath$.pipe(
    switchMap(path => this.articleService.getArticle(path)),
    catchError((err) => {
      if (err.status === 404) this.router.navigate(['/ɵ'], { skipLocationChange: true });
      return [];
    }),
    share(),
  );
  commentsRequest$ = this.articlePath$.pipe(
    switchMap(path => this.articleService.getComments(path)),
    share(),
  );

  showComments = false;
  commentSubmission = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @SkipSelf() public appRoot: AppRoot,
    private articleService: ArticleService,
  ) { }

  ngOnDestroy() {
    this.commentSubmission.unsubscribe();
  }

  submitComment($event) {
    if (!this.commentForm.valid) return false;
    const { params } = this.route.snapshot;
    const path = `/${params.year}/${params.month}/${params.articleName}`;
    const { delta } = this.commentForm.value;
    this.commentForm.disable();
    this.commentSubmission.unsubscribe();
    this.commentSubmission = this.articleService.postComment(path, delta)
      .subscribe(
        (response) => {
          this.commentForm.reset();
        },
        (err) => {
          console.error(err);
        },
        () => this.commentForm.enable()
      );
  }
}
