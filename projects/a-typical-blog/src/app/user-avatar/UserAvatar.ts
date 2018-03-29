import { Component, Input } from '@angular/core';

const colorStore = new Map();

@Component({
  selector: 'user-avatar',
  template: '{{username[0].toUpperCase()}}',
  styleUrls: ['./UserAvatar.scss'],
  host: {
    // we don't want to replace the entire class list, so this is a simple workaround
    '[attr.data-color]': 'getUserColorIndex()'
  },
})
export class UserAvatar {
  @Input() username: string;

  getUserColorIndex() {
    let idx = colorStore.get(this.username);
    if (idx === undefined) {
      colorStore.set(this.username, idx = Math.floor(Math.random() * 11));
    }
    return idx;
  }
}
