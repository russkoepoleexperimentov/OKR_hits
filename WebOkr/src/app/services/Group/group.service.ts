import { Injectable } from '@angular/core';
import { ApiService } from '../httpCLient/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupEndpoint='/Group';

  constructor(private apiService: ApiService) { }

  getGroups(): Observable<any> {
    return this.apiService.get(`${this.groupEndpoint}`);
  }

  createGroup(name:string, parentId?:string | null ):Observable<any>{
    const body:any = {name};
    if(parentId){
      body.parentId=parentId;
    }
    return this.apiService.post(`${this.groupEndpoint}`,body);
  }

  assignStudentToGroup(groupdId:string, userId:string):Observable<any>{
    const body=[userId];
    return this.apiService.post(`${this.groupEndpoint}/${groupdId}/users`,body);
  }

  getGroupInfo(groupId:string): Observable<any> {
    return this.apiService.get(`${this.groupEndpoint}/${groupId}`);
  }
  deleteGroup(groupId: string): Observable<any> {
    const params = new HttpParams().set('id', groupId);
    return this.apiService.deleteWithParams(`${this.groupEndpoint}`, { params });
  }
  
  getGroupsUser(groupId:string): Observable<any> {
    return this.apiService.get(`${this.groupEndpoint}/${groupId}/users`);
  }
  

}
