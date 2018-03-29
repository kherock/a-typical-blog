import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SCSocketCreator } from 'socketcluster-client';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticle(path: string) {
    return this.http.get(path);
  }

  getComments(path: string, maxId?: string) {
    let params = new HttpParams();
    if (maxId) params = params.set('maxId', maxId);
    return this.http.get(`${path}/comments`, { params });
  }

  postComment(path: string, html, parent?: string) {
    return this.http.post(`${path}/comments`, {
      html,
      parent,
    });
  }
}