import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../state/user.actions';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading.component';
import { selectAllUsers, selectUsersError, selectUsersLoading } from '../state/user.selectors';
import { Observable } from 'rxjs';
import { IsAdminDirective } from '../../auth/services/admin.directive';
import { UserState } from '../state/user.reducer';

@Component({
  selector: 'user-edit',
  standalone: true,
  imports: [CommonModule, LoadingComponent, IsAdminDirective],
  template: `
    <div>
      Edit
    </div>
  `
})
export class UserEditComponent implements OnInit {
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
}
