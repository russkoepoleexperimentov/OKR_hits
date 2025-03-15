import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { StudentAppService } from '../../services/Student-Application/student-app.service';

@Component({
  selector: 'app-application-details-dialog',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './application-details-dialog.component.html',
  styleUrls: ['./application-details-dialog.component.scss']
})
export class ApplicationDetailsDialogComponent implements OnInit {
  userRole: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ApplicationDetailsDialogComponent>,
    private userService: UserServiceService,
    private applicationService: StudentAppService,
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
    })

  }

  isAuthor(): boolean {
    return this.data.currentUserId === this.data.author.id;
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteApplication(): void {
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
    this.data.status = newStatus;

    this.applicationService.changeApplicationStatus(this.data.id, newStatus)
      .subscribe({
        next: () => {
          console.log(this.data.id, this.data.status, newStatus);
          this.dialogRef.close({ updatedStatus: newStatus });
        },
        error: (err) => {
          console.error("Ошибка при обновлении статуса:", err);
          alert("Не удалось обновить статус заявки. Попробуйте снова.");
          this.data.status = this.data.previousStatus;
        }
      });
  }


  isAdminOrDean(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Deanery';
  }
}
