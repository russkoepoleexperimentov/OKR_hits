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
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        this.user = currentUser;
        this.userId = currentUser.id;
        this.currentUserId = currentUser.id;
        this.userRole = currentUser.role;
        this.loadApplications();
      },
      error: (err) => console.log('Ошибка получения текущего пользователя:', err)
    });
  }

  removeApplication(applicationId: string): void {
    this.applications = this.applications.filter(app => app.id !== applicationId);
    this.filteredApplications = this.filteredApplications.filter(app => app.id !== applicationId);
    this.totalApplications = this.filteredApplications.length;
    this.updatePagination();
  }

  loadApplications(): void {
    if (!this.userRole) return;

    if (this.userRole === 'Student') {
      this.studentAppService.getApplications(null).subscribe({
        next: (applications) => {
          this.handleApplicationResponse(applications);
        },
        error: (err) => console.error('Ошибка загрузки заявок:', err)
      });
    } else {
      this.studentAppService.getUserApplications().subscribe({
        next: (applications) => {
          this.handleApplicationResponse(applications);
        },
        error: (err) => console.error('Ошибка загрузки заявок:', err)
      });
    }
  }

  private handleApplicationResponse(applications: any[]): void {
    this.applications = applications;
    this.filteredApplications = [...applications];
    this.totalApplications = applications.length;
    this.updatePagination();
    this.cdr.detectChanges();
  }

  applyFilter(filterData: { name: string; startDate: string; endDate: string; status: string }): void {
    this.filteredApplications = this.applications.filter(app => {
      const matchesName = filterData.name.trim()
        ? String(app.author?.credentials).toLowerCase().includes(filterData.name.toLowerCase())
        : true;
  
      const matchesStartDate = filterData.startDate
        ? new Date(app.startDate).toISOString().split('T')[0] >= new Date(filterData.startDate).toISOString().split('T')[0]
        : true;
  
      const matchesEndDate = filterData.endDate
        ? new Date(app.endDate).toISOString().split('T')[0] <= new Date(filterData.endDate).toISOString().split('T')[0]
        : true;
  
      const matchesStatus = filterData.status && filterData.status !== 'all' 
        ? app.status.trim().toLowerCase() === filterData.status.trim().toLowerCase()
        : true;
  
      return matchesName && matchesStartDate && matchesEndDate && matchesStatus;
    });
  
    this.totalApplications = this.filteredApplications.length;
    this.currentPage = 1;
  
    this.filteredApplications = [...this.filteredApplications];
  
    this.cdr.detectChanges();
  }
  
  
  

  getTotalPages(): number {
    return Math.ceil(this.totalApplications / this.pageSize);
  }

  updatePagination(): void {
    if (this.currentPage < 1) this.currentPage = 1;
    const totalPages = this.getTotalPages();
    if (this.currentPage > totalPages) this.currentPage = totalPages;
  
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
