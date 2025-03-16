import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { StudentAppService } from '../../services/Student-Application/student-app.service';
import { AttachmentService } from '../../services/Attachment/attachment.service';

@Component({
  selector: 'app-application-details-dialog',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './application-details-dialog.component.html',
  styleUrls: ['./application-details-dialog.component.scss']
})
export class ApplicationDetailsDialogComponent implements OnInit {
  userRole: string | null = null;
  attachments: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ApplicationDetailsDialogComponent>,
    private userService: UserServiceService,
    private applicationService: StudentAppService,
    private attachmentService : AttachmentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        this.userRole = currentUser.role;
      },
      error: (err) => {
        console.log('Ошибка получения текущего пользователя:', err);
      }
    });

    this.loadAttachments();
  }

  loadAttachments(): void {
    if (!this.data.id) {
        console.warn("Нет ID заявки.");
        return;
    }

    this.applicationService.getApplicationsAttachment(this.data.id).subscribe({
        next: (attachmentIds) => {
            if (!attachmentIds || attachmentIds.length === 0) {
                console.warn("Нет вложений.");
                return;
            }


            attachmentIds.forEach((attachmentId: string) => {
                this.attachmentService.getAttachmentById(attachmentId).subscribe({
                    next: (fileBlob) => {
                        const fileUrl = URL.createObjectURL(fileBlob);
                        this.attachments.push(fileUrl);
                    },
                    error: (err) => {
                        console.error(`Ошибка загрузки файла ${attachmentId}:`, err);
                    }
                });
            });
        },
        error: (err) => {
            console.error("Ошибка загрузки списка вложений:", err);
        }
    });
}


  createFileUrl(file: Blob): string {
    return URL.createObjectURL(file);
  }

  isAuthor(): boolean {
    return this.data.currentUserId === this.data.author.id;
  }

  isAdminOrDean(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Deneary';
  }

  canDeleteApplication(): boolean {
    return this.isAuthor() || this.isAdminOrDean();
  }

  getStatusName(status: string): string {
    const STATUS_MAP: { [key: string]: string } = {
      'Checking': 'На проверке',
      'Approved': 'Одобрено',
      'Declined': 'Отклонено'
    };

    return STATUS_MAP[status] || 'Неизвестно';
  }

  deleteApplication(): void {
    if (!this.canDeleteApplication()) {
      alert("У вас нет прав на удаление этой заявки.");
      return;
    }

    if (!confirm("Вы уверены, что хотите удалить заявку?")) {
      return;
    }

    this.applicationService.deleteApplication(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close({ deleted: true });
      },
      error: (err) => {
        console.error("Ошибка при удалении заявки:", err);
        alert("Не удалось удалить заявку. Попробуйте снова.");
      }
    });
  }

  updateStatus(newStatus: string): void {

    this.applicationService.changeApplicationStatus(this.data.id, newStatus)
      .subscribe({
        next: (response) => {
          this.data.status = newStatus; 
          this.dialogRef.close({ updatedStatus: newStatus });
        },
        error: (err) => {
          console.error("Ошибка при обновлении статуса:", err);
        }
      });
  }

}
