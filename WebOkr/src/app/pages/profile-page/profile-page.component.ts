import { Component, OnInit } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigateBackButtonComponent } from '../../components/navigate-back-button/navigate-back-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, HeaderComponent, NavigateBackButtonComponent, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userId:string | null = null;
  user: any;

  constructor(private userService: UserServiceService) { }

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

  editProfile(updateData: any) {
    this.userService.editUserInfo(updateData.credentials, updateData.email, updateData.phone).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        console.log('Ошибка обновления пользователя:', err);
      }
    });
  }
}
