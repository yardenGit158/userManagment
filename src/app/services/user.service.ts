import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../Models/UserModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5239/api/UsersManagment';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/GetAllUsers`);
  }

  updateUser(users: UserModel[]): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${this.apiUrl}/updateUsers`, users);
  }
}
