import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../state/auth.actions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoadingComponent } from '../../shared/components/loading.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectLoginError, selectLoginLoading } from '../state/auth.selectors';
import { AuthState } from '../state/auth.reducer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoadingComponent, ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule],
  standalone: true,
  template: `
  <div class="login-container" >
    <mat-card>
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <mat-form-field appearance="fill">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username">
            <mat-error *ngIf="loginForm.controls.username.invalid">Username is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
            <button mat-icon-button matSuffix (click)="$event.preventDefault(); hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
              <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.controls.password.invalid">Password is required</mat-error>
          </mat-form-field>

          <div class="login-actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
          </div>

          <mat-error *ngIf="errors$ | async">{{ errors$ | async }}</mat-error>
        </form>
      </mat-card-content>
      <div *ngIf="loading$ | async">
        <loading></loading>
      </div>
    </mat-card>
  </div>
  `,
  styles: `
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  mat-card {
    width: 400px;
    padding: 20px 20px 0 20px;
  }

  .login-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }`
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  loading$: Observable<boolean>;
  errors$: Observable<string>;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loading$ = this.store.select(selectLoginLoading);
    this.errors$ = this.store.select(selectLoginError);
  }

  onLogin() {
    this.store.dispatch(login(this.loginForm.value));
  }
}
