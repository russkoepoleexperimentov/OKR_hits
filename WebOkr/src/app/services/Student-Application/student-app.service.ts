import { Injectable, Query } from '@angular/core';
import { ApiService } from '../httpCLient/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class StudentAppService {
  private studentAppEndpoint = '/StudentApplication';

  constructor(private apiService: ApiService) { }

  getStudentsApplication(studentId: string): Observable<any> {
    return this.apiService.get(`${this.studentAppEndpoint}/${studentId}`);
  }



  getUserApplications(from?: Date, to?: Date, onlyChecking?: boolean): Observable<any> {

    let params = new HttpParams();
    if (from) params = params.set('from', from.toISOString());
    if (to) params = params.set('to', to.toISOString());
    if (onlyChecking !== undefined) params = params.set('onlyChecking', onlyChecking.toString());

    return this.apiService.get(`${this.studentAppEndpoint}/search`, { params });
  }


  createApplicationsAttachment(applicationId: string, formData: FormData): Observable<any> {
    return this.apiService.postWithAttachment(`${this.studentAppEndpoint}/${applicationId}/attachment`, formData);
  }

  getApplicationsAttachment(applicationId: string): Observable<any> {
    return this.apiService.get(`${this.studentAppEndpoint}/${applicationId}/attachment`, { applicationId });
  }


  createApplication(description: string, startDate: Date, endDate: Date): Observable<any> {
    const body = { description, startDate, endDate };
    return this.apiService.post(`${this.studentAppEndpoint}`, body);
  }


  editApplication(id: string, body: any): Observable<any> {
    return this.apiService.put(`${this.studentAppEndpoint}?id=${id}`, body);
  }

  generateReport(studentId?: string, from?: Date, to?: Date): Observable<Blob> {
    const query: any = {};
    if (studentId) query.studentId = studentId;
    if (from) query.from = from.toISOString();
    if (to) query.to = to.toISOString();

    return this.apiService.get<Blob>(
      `${this.studentAppEndpoint}/report`,
      query,
      'blob'
    );
  }


  deleteApplication(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.apiService.deleteWithParams(`${this.studentAppEndpoint}`, { params });
  }


  getApplications(query: any): Observable<any> {
    return this.apiService.get(`${this.studentAppEndpoint}/`, query);
  }

  changeApplicationStatus(applicationId: string, status: string): Observable<any> {
    const body = {};
    return this.apiService.put(`${this.studentAppEndpoint}/${applicationId}/changeStatus?status=${status}`, body);
  }

}
