import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigateBackButtonComponent } from '../../components/navigate-back-button/navigate-back-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { NavigateMainButtonComponent } from '../../components/navigate-main-button/navigate-main-button.component';

@Component({
  selector: 'app-users-page',
  imports: [UserCardComponent, HeaderComponent, NavigateBackButtonComponent, NavigateMainButtonComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  userId:string | null = null;
  user:any;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        this.user = currentUser;
        this.userId = currentUser.id; 
      },
      error: (err) => {
        console.log('Ошибка получения текущего пользователя:', err);
      }
    });
  }
}
