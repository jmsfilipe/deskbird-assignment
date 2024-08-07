import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { logout } from './auth/state/auth.actions';
import { AuthState } from './auth/state/auth.reducer';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from './auth/state/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './user/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'deskbird-assignment';
  isLoggedIn$: Observable<User | null>;

  constructor(private store: Store<AuthState>) {
    this.isLoggedIn$ = this.store.select(selectLoggedInUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
