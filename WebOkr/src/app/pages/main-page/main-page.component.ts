import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { AddApplicationButtonComponent } from '../../components/add-application-button/add-application-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { StudentAppService } from '../../services/Student-Application/student-app.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FilterBlockComponent,
    ApplicationCardComponent,
    AddApplicationButtonComponent,
    CommonModule,
    MatIcon
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  userId: string | null = null;
  user: any = null;
  userRole: string = '';
  currentUserId: string | null = null;
  applications: any[] = [];
  filteredApplications: any[] = [];

  currentPage: number = 1;
  pageSize: number = 6;
  totalApplications: number = 0;

  constructor(
    private userService: UserServiceService,
    private studentAppService: StudentAppService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        this.user = currentUser;
        this.userId = currentUser.id;
        this.currentUserId = currentUser.id;
        this.userRole = currentUser.role;
        this.loadApplications();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ошибка получения текущего пользователя:', err);
      }
    });
  }

  removeApplication(applicationId: string): void {
    this.applications = this.applications.filter(app => app.id !== applicationId);
    this.totalApplications = this.applications.length;
    this.updatePagination();
    this.cdr.detectChanges();
  }

  loadApplications(): void {
    let params: any = {};

    if (this.userRole === 'student') {
      params.studentId = this.userId;
    }

    this.studentAppService.getApplications(params).subscribe({
      next: (applications) => {
        this.applications = applications;
        this.totalApplications = this.applications.length;
        this.updatePagination();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки заявок:', err);
      }
    });
  }

  applyFilter(filterData: { name: string; startDate: string; endDate: string }): void {
    const filtered = this.applications.filter(app => {
      const matchesName = filterData.name
        ? app.author.credentials.toLowerCase().includes(filterData.name.toLowerCase())
        : true;
      const matchesStartDate = filterData.startDate
        ? new Date(app.startDate) >= new Date(filterData.startDate)
        : true;
      const matchesEndDate = filterData.endDate
        ? new Date(app.endDate) <= new Date(filterData.endDate)
        : true;

      return matchesName && matchesStartDate && matchesEndDate;
    });

    this.applications = filtered;
    this.totalApplications = this.applications.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalApplications / this.pageSize);
  }


  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredApplications = this.applications.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalApplications) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
