import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

import { AppAuthDialog } from '../dialogs/app-auth';
import { BehaviorSubject } from 'rxjs';

interface AuthenticatedUser {
  username: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthenticationService {

  constructor(
    public http: HttpClient,
    public matDialog: MatDialog,
  ) { }

  user$ = new BehaviorSubject<AuthenticatedUser>(null);

  showAuthDialog() {
    return this.matDialog.open(AppAuthDialog, { data: this });
  }

  restoreSession() {
    return this.http.get<AuthenticatedUser>('/session').pipe(
      tap(user => this.user$.next(user))
    );
  }

  logIn(formData) {
    return this.http.post<AuthenticatedUser>('/session', formData).pipe(
      tap(user => this.user$.next(user))
    );
  }

  logOut() {
    return this.http.delete('/session').pipe(
      tap(() => this.user$.next(null))
    );
  }
}
