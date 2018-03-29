import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './AppRoot.html',
  styleUrls: ['./AppRoot.scss'],
  host: {
    '[class.dark-theme]': 'isDarkTheme'
  }
})
export class AppRoot {
  title = 'some blog';

  isDarkTheme = false;
}
