import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'userEdit',
  standalone: true,
  imports: [ReactiveFormsModule, MatGridListModule, MatInputModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
  template: `
    <h1 mat-dialog-title>Edit User</h1>
    <mat-dialog-content>
      <form [formGroup]="form">
      <mat-grid-list cols="2" rowHeight="2:1">
        <mat-grid-tile>
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name">
          </mat-form-field>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-form-field>
            <mat-label>Username</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-form-field>
            <mat-label>Role</mat-label>
            <mat-select formControlName="role">
              <mat-option value="admin">Admin</mat-option>
              <mat-option value="user">User</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-grid-tile>
      </mat-grid-list>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Cancel</button>
      <button mat-button (click)="save()">Save</button>
    </mat-dialog-actions>
  `
})
export class UserEditComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: [data.user.name, Validators.required],
      username: [data.user.username, Validators.required],
      role: [data.user.role, Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data.user, ...this.form.value });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
