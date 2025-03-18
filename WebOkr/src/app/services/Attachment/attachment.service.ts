import { Injectable } from '@angular/core';
import { ApiService } from '../httpCLient/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private attachmentEndpoint='/Attachment';

  constructor(private apiService: ApiService) { }

  getAttachmentById(attachmentId:string): Observable<any> {
    return this.apiService.get(`${this.attachmentEndpoint}/${attachmentId}`, { }, 'blob');
  }

}
