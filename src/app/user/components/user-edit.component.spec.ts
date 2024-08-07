import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserEditComponent } from './user-edit.component';
import { UserState } from '../state/user.reducer';
import { editUser } from '../state/user.actions';
import { User } from '../user.model';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let store: MockStore<UserState>;
  let dialogRef: MatDialogRef<UserEditComponent>;

  const mockUser: User = { id: '1', username: 'admin', role: 'admin', password: '1', name: 'Admin' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserEditComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        },
        { provide: MAT_DIALOG_DATA, useValue: { user: mockUser } }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    expect(component.form.value).toEqual({
      username: mockUser.username,
      role: mockUser.role,
      name: mockUser.name
    });
  });

  it('should close dialog on form submit', () => {
    spyOn(store, 'dispatch');
    component.form.setValue({ username: 'updatedAdmin', role: 'admin', name: 'Admin' });
    component.save();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
