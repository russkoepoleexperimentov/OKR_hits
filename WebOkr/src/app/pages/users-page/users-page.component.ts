import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigateBackButtonComponent } from '../../components/navigate-back-button/navigate-back-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { NavigateMainButtonComponent } from '../../components/navigate-main-button/navigate-main-button.component';
import { GroupService } from '../../services/Group/group.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UserCardComponent, HeaderComponent, NavigateBackButtonComponent, NavigateMainButtonComponent, CommonModule, FormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  userId: string | null = null;
  currentUser: any;
  users: any[] = [];
  filteredUsers: any[] = [];
  groups: any[] = [];
  selectedGroupId: string = '';
  groupMap: { [userId: string]: string } = {}; 

  constructor(private userService: UserServiceService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUserData) => {
        this.currentUser = currentUserData;
        this.userId = currentUserData.id;
        this.loadUsers();
        this.loadGroups();
      },
      error: (err) => console.error('Ошибка получения текущего пользователя:', err)
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loadUserGroups(); 
      },
      error: (err) => console.error('Ошибка загрузки пользователей:', err)
    });
  }

  loadUserGroups() {
    this.users.forEach(user => {
      if (user.groupId) {
        this.groupService.getGroupInfo(user.groupId).subscribe({
          next: (groupData) => {
            this.groupMap[user.id] = groupData.name || '—';
          },
          error: () => {
            this.groupMap[user.id] = '—';
          }
        });
      } else {
        this.groupMap[user.id] = '—';
      }
    });
  }

  loadGroups() {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (err) => console.error('Ошибка загрузки групп:', err)
    });
  }

  filterUsersByGroup() {
    if (!this.selectedGroupId) {
      this.filteredUsers = this.users;
    } else {
      this.groupService.getGroupsUser(this.selectedGroupId).subscribe({
        next: (filteredUsers) => {
          this.filteredUsers = filteredUsers;
        },
        error: (err) => console.error('Ошибка при фильтрации пользователей:', err)
      });
    }
  }
}
