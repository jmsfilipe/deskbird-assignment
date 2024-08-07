import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserListComponent } from './user-list.component';
import { selectAllUsers } from '../state/user.selectors';
import { UserState } from '../state/user.reducer';
import { User } from '../user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore<UserState>;
  let dialog: MatDialog;

  const mockUsers: User[] = [
    { id: '1', username: 'admin', role: 'admin', password: '1', name: 'Admin' },
    { id: '2', username: 'user1', role: 'user', password: '1', name: 'User' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllUsers, value: mockUsers }
          ]
        }),
        {
          provide: MatDialog,
          useValue: { open: jasmine.createSpy('open') }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of users', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('mat-list-item').length).toBe(2);
  });
});
