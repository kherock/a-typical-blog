import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './AppAuthDialog.html',
  styleUrls: ['./AppAuthDialog.scss'],
})
export class AppAuthDialog implements OnInit {

  get doSignUp() { return this._doSignUp; }
  set doSignUp(value) {
    this._doSignUp = value;
    this.errorText = '';
    if (value) {
      this.authForm.get('name').enable();
    } else {
      this.authForm.get('name').disable();
    }
  }
  protected _doSignUp: boolean;

  authForm = this.fb.group({
    name: ['', control => control.value.trim().split(' ').length < 2 ? { required: true } : null],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorText = '';

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AppAuthDialog>,
    @Inject(MAT_DIALOG_DATA) public authenticationService,
  ) { }

  ngOnInit() {
    this.doSignUp = false;
  }

  submitForm($event) {
    if (!this.authForm.valid) return false;
    const { name, ...formValue } = this.authForm.value;
    if (name) {
      const names = name.trim().split(' ');
      formValue.firstName = names.slice(0, -1).join(' ');
      formValue.lastName = names.slice(-1)[0];
    }
    this.authForm.disable();
    this.authenticationService.logIn(formValue).subscribe(
      result => this.dialogRef.close(result),
      (err) => {
        this.authForm.enable();
        this.doSignUp = this.doSignUp;
        this.errorText = err.error.message;
      }
    );
  }
}
