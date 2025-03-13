import { Component, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { AddApplicationButtonComponent } from '../../components/add-application-button/add-application-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, FilterBlockComponent, ApplicationCardComponent, AddApplicationButtonComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  userId: string | null = null;
  user: any = null;
  userRole: string = '';
  currentUserId: string | null = null;

  constructor(private userService: UserServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        console.log("Загружен пользователь:", currentUser);
        this.user = currentUser;
        this.userId = currentUser.id;
        this.currentUserId = currentUser.id;
        this.userRole = currentUser.role;
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.log('Ошибка получения текущего пользователя:', err);
      }
    });
  }
}
