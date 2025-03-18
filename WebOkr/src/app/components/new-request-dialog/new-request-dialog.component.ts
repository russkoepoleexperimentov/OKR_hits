import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { StudentAppService } from '../../services/Student-Application/student-app.service';
import { DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-new-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
  templateUrl: './new-request-dialog.component.html',
  styleUrl: './new-request-dialog.component.scss'
})
export class NewRequestDialogComponent {
  description: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedFiles: File[] = [];
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<NewRequestDialogComponent>,
    private studentAppService: StudentAppService
  ) { }

  close() {
    this.resetForm();
    this.dialogRef.close();
  }

  resetForm() {
    this.description = '';
    this.startDate = null;
    this.endDate = null;
    this.selectedFiles = [];
    this.isLoading = false;
  }

  save() {
    if (!this.description.trim() || !this.startDate || !this.endDate) {
      alert("Заполните все поля!");
      return;
    }

    if (this.endDate < this.startDate) {
      alert("Дата окончания не может быть раньше даты начала!");
      return;
    }

    this.isLoading = true;
    this.studentAppService.createApplication(this.description, this.startDate, this.endDate).subscribe({
      next: (applicationId) => {
        if (this.selectedFiles.length) {
          this.uploadAttachments(applicationId);
        } else {
          this.dialogRef.close({ created: true });
        }
      },
      error: (err) => {
        console.error("Ошибка при создании заявки:", err);
        this.isLoading = false;
      }
    });
  }


  uploadAttachments(applicationId: string) {
    this.isLoading = true;

    let uploadedCount = 0;
    const totalFiles = this.selectedFiles.length;

    this.selectedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('File', file);

      this.studentAppService.createApplicationsAttachment(applicationId, formData).subscribe({
        next: () => {
          uploadedCount++;

          if (uploadedCount === totalFiles) {
            this.dialogRef.close({ created: true });
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error("Ошибка при загрузке файла:", err);
          this.isLoading = false;
        }
      });
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('drag-over');

    if (event.dataTransfer?.files) {
      this.selectedFiles = Array.from(event.dataTransfer.files);
    }
  }
}
