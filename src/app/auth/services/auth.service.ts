import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    this.seedUsers();
  }

  private seedUsers() {
    const users: User[] = [{
      username: 'admin',
      password: 'admin',
      role: 'admin',
      id: '7',
      name: 'Admin'
    }, {
      username: 'user',
      password: 'user',
      role: 'user',
      id: '8',
      name: 'User'
    }];
    if (!localStorage.getItem('seedUsers')) {
      localStorage.setItem('seedUsers', JSON.stringify(users));
    }
  }

  authenticate(username: string, password: string) {
    const users = JSON.parse(localStorage.getItem('seedUsers') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);

    return user;
  }
}
