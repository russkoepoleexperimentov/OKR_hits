import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDetailsDialogComponent } from '../application-details-dialog/application-details-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-card',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.scss'
})
export class ApplicationCardComponent {
  @Input() request: any;
  @Input() currentUserId: string | null = null;
  @Input() currentUserRole: string | null = null;
  @Output() applicationDeleted = new EventEmitter<string>();

  private dialogRef: MatDialogRef<ApplicationDetailsDialogComponent> | null = null;

  constructor(public dialog: MatDialog) { }

  openDetails(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(ApplicationDetailsDialogComponent, {
      width: '1000px',
      height: 'fit-content',
      data: {
        ...this.request,
        currentUserId: this.currentUserId,
        currentUserRole: this.currentUserRole
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result?.deleted) {
        this.applicationDeleted.emit(this.request.id);
      }
      if (result?.updatedStatus) {
        this.request.status = result.updatedStatus;
      }
    });
  }


  getStatusName(status: string): string {
    const STATUS_MAP: { [key: string]: string } = {
      'Checking': 'На проверке',
      'Approved': 'Одобрено',
      'Declined': 'Отклонено'
    };

    return STATUS_MAP[status] || 'Неизвестно';
  }
}
