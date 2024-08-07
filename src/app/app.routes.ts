import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login.component';
import { UserListComponent } from './user/components/user-list.component';
import { AuthGuard } from './auth/services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
