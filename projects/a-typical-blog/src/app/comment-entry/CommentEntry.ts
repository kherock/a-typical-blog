import { Component, Self, Optional, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form[comment-entry]',
  templateUrl: './CommentEntry.html',
  styleUrls: ['./CommentEntry.scss'],
  host: {
    '(reset)': 'onReset()'
  },
})
export class CommentEntry {
  quillFormats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'script',
    'link',
    'image',
  ];

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      ['clean'],
      ['link', 'image'],
    ]
  };

  @ViewChild('matInput') matInput;

  constructor(@Optional() @Self() public formGroup: FormGroupDirective) { }

  onReset() {
    this.matInput.value = null;
    this.matInput.focused = false;
  }
}
