import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, Optional, Self } from '@angular/core';
import { NgControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { MatInputBase } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { QuillEditorComponent } from './QuillUniversalModule';

@Directive({
  selector: 'quill-editor[matInput]',
  providers: [{ provide: MatFormFieldControl, useExisting: QuillMatInput }],
  exportAs: 'matInput',
  host: {
    'class': 'mat-input-element',
    '[attr.id]': 'id',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
  }
})
export class QuillMatInput extends mixinErrorState(MatInputBase) implements MatFormFieldControl<string> {
  static nextId = 0;

  /** The aria-describedby attribute on the input for improved a11y. */
  _ariaDescribedby: string;

  id = 'quillEditor-' + QuillMatInput.nextId++;

  @Input() placeholder: string;

  @Input() errorStateMatcher: ErrorStateMatcher;

  get value() {
    if (!this.quillEditorRef.quillEditor) return null;
    return this.quillEditorRef.quillEditor.getContents();
  }
  set value(value) {
    this.quillEditorRef.writeValue(value);
  }

  get focused() {
    if (!this.quillEditorRef.quillEditor) return false;
    return this.quillEditorRef.quillEditor.hasFocus();
  }
  set focused(value) {
    if (!this.quillEditorRef.quillEditor) return;
    if (value) {
      this.quillEditorRef.quillEditor.focus();
    } else {
      this.quillEditorRef.quillEditor.blur();      
    }
  }

  get empty() {
    if (!this.quillEditorRef.quillEditor) return true;
    return this.quillEditorRef.quillEditor.getLength() <= 1;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }
  protected _required = false;

  @Input('readOnly')
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this.quillEditorRef.readOnly;
  }
  set disabled(value: boolean) {
    this.quillEditorRef.readOnly = coerceBooleanProperty(value);

    // Browsers may not fire the blur event if the input is disabled too quickly.
    // Reset from here to ensure that the element doesn't become stuck.
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }
  protected _disabled = false;

  controlType = 'quill';
  stateChanges = new Subject<void>();

  constructor(
    defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    @Optional() @Self() public ngControl: NgControl,
    public quillEditorRef: QuillEditorComponent,
  ) { super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl); }

  ngOnInit() {
    merge(
      this.quillEditorRef.onEditorCreated,
      this.quillEditorRef.onContentChanged,
      this.quillEditorRef.onSelectionChanged,
    ).pipe(mapTo(null)).subscribe(this.stateChanges);
  }

  ngAfterViewInit() {
    if (!this.quillEditorRef.quillEditor) return;
    const { tooltip } = this.quillEditorRef.quillEditor.theme;
    if (tooltip) {
      tooltip.root.addEventListener('click', ev => ev.stopPropagation());
    }
  }

  ngOnChanges(changes) {
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  onContainerClick() {
    if (!this.focused) this.focused = true;
  }
}

