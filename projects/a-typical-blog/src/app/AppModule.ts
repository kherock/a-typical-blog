import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from './QuillUniversalModule';

import { MaterialModule } from './MaterialModule';

import { ArticleService } from './core/ArticleService';
import { Authentication } from './core/Authentication';

import { QuillMatInput } from './QuillMatInput';

import { AppHome } from './app-home';
import { AppRoot } from './app-root';
import { ArticleContent } from './article-content';
import { ArticleComments } from './article-comments';
import { ArticleView } from './article-view';
import { CommentEntry } from './comment-entry';
import { NotFound } from './not-found';
import { UserAvatar } from './user-avatar';

@NgModule({
  declarations: [
    AppHome,
    AppRoot,
    ArticleContent,
    ArticleComments,
    ArticleView,
    CommentEntry,
    QuillMatInput,
    NotFound,
    UserAvatar,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app' }),
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppHome, pathMatch: 'full' },
      { path: ':year/:month/:articleName', component: ArticleView },
      { path: '**', component: NotFound }
    ], { initialNavigation: 'enabled' }),
    QuillModule,
  ],
  exports: [
    AppRoot
  ],
  providers: [
    ArticleService,
    Authentication,
  ],
})
export class AppModule { }
