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
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, MatIconModule, UserEditComponent, IsAdminDirective],
  template: `
    <mat-card>
      <div *ngIf="loading$ | async; else userListTemplate">
        <loading></loading>
      </div>
      <ng-template #userListTemplate>
        <mat-list role="list">
          <mat-list-item role="listitem" *ngFor="let user of users$ | async">
            <span matListItemIcon>
              <mat-icon *ngIf="user.role === 'admin'; else normalUser">shield-person</mat-icon>
              <ng-template #normalUser>
                <mat-icon>person</mat-icon>
              </ng-template>
            </span>
            <span matListItemTitle> {{ user.name }} </span>
            <span matListItemLine> username: {{ user.username }} </span>
            <span matListItemMeta>
              <button *isAdmin mat-icon-button aria-label="Edit user" (click)="onEdit(user)">
                <mat-icon>edit</mat-icon>
              </button>
            </span>
          </mat-list-item>
        </mat-list>
      </ng-template>
    </mat-card>
  `
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<UserState>, private dialog: MatDialog) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  onEdit(user: User) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      height: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(editUser({ user: result }));
      }
    });
  }
}
