import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SCSocketCreator } from 'socketcluster-client';
import { Observable, concat } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';

export interface Article {
  author: string;
  date: string;
  article: string;
  parent: string;
  html: string;
}

export interface ArticleComment {
  _id: string;
  author: string;
  date: Date;
  html: string;
}

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) { }

  socket = SCSocketCreator.create();

  getChannelStream<T>(channelName) {
    return Observable.create((observer) => {
      const handler = (data: T) => observer.next(data);
      this.socket.subscribe(channelName);
      this.socket.watch(channelName, handler);
      return () => {
        this.socket.unwatch(channelName, handler);
        if (!this.socket.watchers().length) {
          this.socket.unsubscribe(channelName);
        }
      };
    });
  }

  getArticle(path: string) {
    return concat(
      this.http.get<Article>(path),
      this.getChannelStream<Partial<Article>>(path),
    ).pipe(scan((acc, value) => ({ ...acc, ...value }), {}));
  }

  getComments(path: string, maxId?: string) {
    let params = new HttpParams();
    if (maxId) {
      params = params.set('maxId', maxId);
    }
    return concat(
      this.http.get<ArticleComment[]>(`${path}/comments`, { params }).pipe(mergeMap(comments => comments)),
      this.getChannelStream(`${path}/comments`),
    ).pipe(scan((acc: ArticleComment[], value: ArticleComment) => {
      const existingIdx = acc.findIndex(comment => comment._id === value._id);
      if (existingIdx === -1) {
        return [value, ...acc];
      }
      acc = [...acc];
      acc[existingIdx] = value;
      return acc;
    }, []));
  }

  postComment(path: string, html, parent?: string) {
    return this.http.post(`${path}/comments`, {
      html,
      parent,
    });
  }
}
