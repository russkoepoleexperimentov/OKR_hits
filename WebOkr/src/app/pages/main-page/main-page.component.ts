import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { AddApplicationButtonComponent } from '../../components/add-application-button/add-application-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { StudentAppService } from '../../services/Student-Application/student-app.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { GenerateReportComponent } from '../../components/generate-report/generate-report.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FilterBlockComponent,
    ApplicationCardComponent,
    AddApplicationButtonComponent,
    CommonModule,
    MatIcon,
    GenerateReportComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  userId: string | null = null;
  user: any = null;
  userRole: string = '';
  currentUserId: string | null = null;
  applications: any[] = [];
  filteredAll: any[] = [];
  filteredApplications: any[] = [];

  currentPage: number = 1;
  pageSize: number = 6;
  totalApplications: number = 0;

  filterData: { studentId: string | null; from: Date | null; to: Date | null } = {
    studentId: null,
    from: null,
    to: null
  };

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
    this.filteredAll = this.filteredAll.filter(app => app.id !== applicationId);
    this.totalApplications = this.filteredAll.length;
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
    this.filteredAll = [...applications];
    this.totalApplications = this.filteredAll.length;

    this.currentPage = 1;
    this.updatePagination();

    this.cdr.detectChanges();
  }

  applyFilter(filterData: { 
    name: string; 
    startDate: string;  
    endDate: string;    
    status: string;
    studentId?: string 
  }): void {

    const from = filterData.startDate ? new Date(filterData.startDate) : null;
    const to   = filterData.endDate   ? new Date(filterData.endDate)   : null;

    const filtered = this.applications.filter(app => {
      const matchesName = filterData.name.trim()
        ? String(app.author?.credentials).toLowerCase().includes(filterData.name.toLowerCase())
        : true;

      const matchesStatus = filterData.status && filterData.status !== 'all'
        ? app.status.trim().toLowerCase() === filterData.status.trim().toLowerCase()
        : true;

      if (!from || !to) {
        return matchesName && matchesStatus;
      }

      const appStart = new Date(app.startDate);
      const appEnd   = new Date(app.endDate);

      appStart.setHours(0, 0, 0, 0);
      appEnd.setHours(0, 0, 0, 0);
      from.setHours(0, 0, 0, 0);
      to.setHours(0, 0, 0, 0);

      const inRange =
        (appStart >= from && appStart <= to)
        || (appEnd >= from && appEnd <= to)
        || (appStart <= from && appEnd >= to);

      return matchesName && matchesStatus && inRange;
    });

    this.filteredAll = filtered;
    this.totalApplications = this.filteredAll.length;
    this.currentPage = 1;

    this.updatePagination();

    this.filterData = {
      studentId: filterData.studentId || null,
      from,
      to
    };

    console.log("Отфильтрованные заявки:", this.filteredAll);
    this.cdr.detectChanges();
  }

  updatePagination(): void {
    if (this.currentPage < 1) this.currentPage = 1;
    const totalPages = this.getTotalPages();
    if (this.currentPage > totalPages) this.currentPage = totalPages;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.filteredApplications = this.filteredAll.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalApplications / this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
