import { Component, OnInit } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigateBackButtonComponent } from '../../components/navigate-back-button/navigate-back-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from '../../components/admin-panel/admin-panel.component';
import { ActivatedRoute } from '@angular/router';
import { NavigateMainButtonComponent } from '../../components/navigate-main-button/navigate-main-button.component';
import { GroupService } from '../../services/Group/group.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, HeaderComponent, NavigateBackButtonComponent, CommonModule, AdminPanelComponent, NavigateMainButtonComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userId: string | null = null;
  user: any;
  currentUser: any;
  userGroup: string = '';

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.userId = params.get('id');
        console.log("Обновление профиля, новый userId:", this.userId);
        this.loadUserProfile();
    });

    this.userService.getUserProfile().subscribe({
        next: (currentUserData) => {
            this.currentUser = currentUserData;
        },
        error: (err) => {
            console.log('Ошибка загрузки текущего пользователя:', err);
        }
    });
}

loadUserProfile() {
    if (this.userId) {
        this.userService.getUserById(this.userId).subscribe({
            next: (userData) => {
                console.log("Профиль загружен:", userData);
                this.user = userData;
                if (this.user.groupId) {
                    this.loadUserGroup(this.user.groupId);
                }
            },
            error: (err) => {
                console.log('Ошибка загрузки профиля пользователя:', err);
            }
        });
    }
}
  loadUserGroup(groupId: string) {
    this.groupService.getGroupInfo(groupId).subscribe({
      next: (groupData) => {
        this.userGroup = groupData.name || '—';
      },
      error: (err) => console.error("Ошибка загрузки группы:", err)
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
        this.user = response;
      },
      error: (err) => {
        console.log('Ошибка обновления пользователя:', err);
      }
    });
  }
}