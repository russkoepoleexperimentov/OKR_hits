import { Injectable } from '@angular/core';
import { ApiService } from '../httpCLient/api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private userEndpoint = '/User';

  constructor(private apiService: ApiService) { }

  register(email: string, password: string, credentials: string, phone: string): Observable<{ token: string }> {
    const body = { email, password, credentials, phone };

    return this.apiService.post<{ token: string }>(`${this.userEndpoint}/register`, body).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const body = { email, password };

    return this.apiService.post<{ token: string }>(`${this.userEndpoint}/login`, body).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.apiService.get(`${this.userEndpoint}/profile`);
  }

  getUserById(id: string): Observable<any> {
    return this.apiService.get(`${this.userEndpoint}/${id}`);
  }

  editUserInfo(credentials?: string, email?: string, phone?: string): Observable<any> {
    const body: any = {};

    if (credentials) body.credentials = credentials;
    if (email) body.email = email;
    if (phone) body.phone = phone;

    return this.apiService.patch(`${this.userEndpoint}/profile`, body);
  }


}
