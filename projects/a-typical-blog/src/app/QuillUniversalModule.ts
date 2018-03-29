import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
} from '@angular/forms';

export interface CustomOption {
  import: string;
  whitelist: Array<any>;
}

export interface QuillEditorComponent {
  quillEditor: any;
  editorElem: HTMLElement;
  emptyArray: any[];
  content: any;
  defaultModules: any;
}

@Component({
  selector: 'quill-editor',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuillEditorComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: QuillEditorComponent,
      multi: true
    }
  ],
})
export class QuillEditorComponent implements ControlValueAccessor, Validator {
  @Input() theme: string;
  @Input() modules: { [index: string]: Object };
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() required: boolean;
  @Input() formats: string[];
  @Input() style: any = {};
  @Input() strict: boolean = true;
  @Input() scrollingContainer: HTMLElement | string;
  @Input() bounds: HTMLElement | string;
  @Input() customOptions: CustomOption[];

  @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
  @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();

  writeValue(currentValue: any) { };
  registerOnChange(fn: Function) { };
  registerOnTouched(fn: Function) { };
  validate() { return null; };
}

@NgModule({
  declarations: [
    QuillEditorComponent
  ],
  exports: [
    QuillEditorComponent
  ]
})
export class QuillModule { }