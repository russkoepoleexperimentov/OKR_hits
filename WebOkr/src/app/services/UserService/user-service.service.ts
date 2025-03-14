import { Injectable } from '@angular/core';
import { ApiService } from '../httpCLient/api.service';
import { Observable, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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

  editUserInfo(body: any): Observable<any> {
    return this.apiService.put(`${this.userEndpoint}/profile`, body);
  }


  makeDeanary(id: string): Observable<any> {
    return this.apiService.post<{ token: string }>(`${this.userEndpoint}/${id}/makeDeanary`, id).pipe(
      tap(response => {
      })
    );
  }

  makeTeacher(id: string): Observable<any> {
    return this.apiService.post<{ token: string }>(`${this.userEndpoint}/${id}/makeTeacher`, id).pipe(
      tap(response => {
      })
    );
  }

  getUsers(query?: any): Observable<any> {
    const params = query ? new HttpParams({ fromObject: query }) : new HttpParams();
    return this.apiService.get(`${this.userEndpoint}/search`, { params });
  }

  detachUserFromGroup(userId:string, groupId:string):Observable<any>{
    return this.apiService.post(`${this.userEndpoint}/${userId}/detatchGroup`, groupId);
  }

}
