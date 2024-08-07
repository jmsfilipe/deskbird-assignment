import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editUser, loadUsers } from '../state/user.actions';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading.component';
import { selectAllUsers, selectUsersError, selectUsersLoading } from '../state/user.selectors';
import { Observable } from 'rxjs';
import { IsAdminDirective } from '../../auth/services/admin.directive';
import { UserState } from '../state/user.reducer';
import { UserEditComponent } from './user-edit.component';
import { User } from '../user.model';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, LoadingComponent, UserEditComponent, IsAdminDirective],
  template: `
    <div *ngIf="loading$ | async; else userListTemplate">
      <loading></loading>
    </div>
    <ng-template #userListTemplate>
      <ul>
        <li *ngFor="let user of users$ | async">
          {{ user.username }}
          <button *isAdmin (click)="onEdit(user)">Edit</button>
        </li>
      </ul>
    </ng-template>
    <user-edit />
  `
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<UserState>) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  onEdit(user: User) {
    this.store.dispatch(editUser({ user }));
  }
}
