import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../core/AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './AppRoot.html',
  styleUrls: ['./AppRoot.scss'],
  host: {
    '[class.dark-theme]': 'isDarkTheme'
  },
})
export class AppRoot implements OnInit {
  title = 'some blog';

  isDarkTheme = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.restoreSession().subscribe();
  }
}
