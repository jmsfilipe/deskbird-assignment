import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../state/auth.actions';
import { FormsModule } from '@angular/forms'
import { LoadingComponent } from '../../shared/components/loading.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectLoginLoading } from '../state/auth.selectors';
import { AuthState } from '../state/auth.reducer';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, LoadingComponent],
  standalone: true,
  template: `
    <div *ngIf="loading$ | async">
      <loading></loading>
    </div>
    <div>
      <input [(ngModel)]="username" placeholder="Username">
      <input [(ngModel)]="password" type="password" placeholder="Password">
      <button (click)="onLogin()">Login</button>
    </div>
  `
})
export class LoginComponent {
  username: string;
  password: string;
  loading$: Observable<boolean>;

  constructor(private store: Store<AuthState>) {
    this.loading$ = this.store.select(selectLoginLoading);
  }

  onLogin() {
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
}
