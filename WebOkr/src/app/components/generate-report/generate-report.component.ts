import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentAppService } from '../../services/Student-Application/student-app.service';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {
  @Input() studentId: string | null = null;
  @Input() from: Date | null = null;
  @Input() to: Date | null = null;

  userRole: string | null = null;
  
  constructor(
    private studentAppService: StudentAppService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        this.userRole = currentUser.role;
      },
      error: (err) => {
        console.error('Ошибка получения профиля пользователя', err);
      }
    });
  }

  isAllowed(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Deneary';
  }

  downloadReport(): void {
    if (!this.isAllowed()) return;
  
    let fromFixed: Date | undefined = undefined;
    let toFixed: Date | undefined = undefined;
  
    if (this.from) {
      fromFixed = new Date(this.from);
      fromFixed.setHours(0, 0, 0, 0);
    }
    if (this.to) {
      toFixed = new Date(this.to);
      toFixed.setHours(23, 59, 59, 999); 
    }
  
    this.studentAppService.generateReport(
      this.studentId ?? undefined,
      fromFixed,
      toFixed
    ).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Ошибка при выгрузке отчета', err);
      }
    });
  }
  
}
