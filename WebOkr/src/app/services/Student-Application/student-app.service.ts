import { Injectable, Query } from '@angular/core';
import { ApiService } from '../httpCLient/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentAppService {
  private studentAppEndpoint = '/StudentApplication';

  constructor(private apiService: ApiService) { }

  
  createApplication(description:string,startDate:Date,endDate:Date):Observable<any>{
    const body = {description,startDate,endDate};
    return this.apiService.post(`${this.studentAppEndpoint}`,body);
  }
  editApplication(body:any):Observable<any>{
    return this.apiService.put(`${this.studentAppEndpoint}`,body);
  }
  deleteApplication(id: string): Observable<any> {
      const params = new HttpParams().set('id', id);
      return this.apiService.deleteWithParams(`${this.studentAppEndpoint}`, { params });
  }

  getStudentsApplication(studentId:string):Observable<any>{
    return this.apiService.get(`${this.studentAppEndpoint}/${studentId}`);
  }
  getApplications(query:any):Observable<any>{
    return this.apiService.get(`${this.studentAppEndpoint}/search`,query);
  }

  getApplicationsAttachment(studentId:string, applicationId:string):Observable<any>{
    return this.apiService.get(`${this.studentAppEndpoint}/${studentId}/attachment`, {applicationId});
  }
  createApplicationsAttachment(studentId:string, applicationId:string):Observable<any>{
    return this.apiService.post(`${this.studentAppEndpoint}/${studentId}/attachment`, {applicationId});
  }

  changeApplicationStatus(applicationId:string, status:string):Observable<any>{
    const body = {applicationId,status};
    return this.apiService.put(`${this.studentAppEndpoint}/${applicationId}/changeStatus`,body);
  }

}
