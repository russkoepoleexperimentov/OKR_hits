import { Component, OnInit } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigateBackButtonComponent } from '../../components/navigate-back-button/navigate-back-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from '../../components/admin-panel/admin-panel.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, HeaderComponent, NavigateBackButtonComponent, CommonModule, AdminPanelComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userId: string | null = null;
  user: any;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        console.log('Текущий пользователь:', currentUser);
        this.user = currentUser;
      },
      error: (err) => {
        console.log('Ошибка получения текущего пользователя:', err);
      }
    });
  }

  updateUser(updatedData: any) {
    const requestBody = {
        credentials: updatedData.credentials ?? this.user.credentials,
        email: updatedData.email ?? this.user.email,
        phone: updatedData.phone ?? this.user.phone
    };


    this.userService.editUserInfo(requestBody).subscribe({
        next: (response) => {
            console.log('Пользователь обновлен:', response);
            this.user = response; 
        },
        error: (err) => {
            console.log('Ошибка обновления пользователя:', err);
        }
    });
}

}
