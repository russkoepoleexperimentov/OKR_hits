import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../services/Group/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @Input() userId!: string;
  @Output() userUpdated= new EventEmitter<void>();
  isAdminOrDean: boolean = false;
  roles = ['Учитель', 'Сотрудник деканата'];
  availableRoles: string[] = [];
  groups: any[] = [];
  userGroup: any = null;
  selectedRole: string = '';
  selectedGroup: string = '';
  selectedGroupToDelete: string = '';
  newGroupName: string = '';
  parentId: string | null = null;

  constructor(private userService: UserServiceService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private crf:ChangeDetectorRef) { }


    ngOnInit(): void {
      this.userId = this.route.snapshot.paramMap.get('id') ?? '';
  
      this.userService.getUserProfile().subscribe({
          next: (userData) => {
              this.isAdminOrDean = userData.role === 'Admin' || userData.role === 'Deneary';
              if (this.isAdminOrDean) {
                  this.loadGroups();
              }
              this.availableRoles = userData.role === 'Deneary' ? ['Учитель'] : this.roles;
          },
          error: (err) => {
              console.log('Ошибка получения профиля:', err);
          }
      });
  }

  loadUserGroup(groupId: string) {
    this.groupService.getGroupInfo(groupId).subscribe({
      next: (groupData) => {
        this.userGroup = groupData.name;
      },
      error: (err) => {
        console.error('Ошибка загрузки группы пользователя:', err);
      }
    });
  }
  
  loadGroups() {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (err) => {
        console.error('Ошибка загрузки групп:', err);
      }
    });
  }

  removeUserFromGroup(){
    this.userService.detachUserFromGroup(this.userId, this.userGroup).subscribe({
      next: () => {
        this.userGroup = '';
        this.userUpdated.emit();
      },
      error: (err) => console.log("Ошибка при удалении пользователя из группы", err)
    });
  }

  addGroup() {
    if (!this.newGroupName.trim()) {
      alert("Название группы не может быть пустым");
      return;
    }

    const parentGroup = this.groups.find(group => group.id === this.parentId);
    const fullGroupName = parentGroup ? `${parentGroup.name} ${this.newGroupName}` : this.newGroupName;
    const existingGroup = this.groups.find(group => group.name.toLowerCase() === fullGroupName.toLowerCase());

    if (existingGroup) {
      alert("Группа с таким названием уже существует.");
      return;
    }


    this.groupService.createGroup(fullGroupName, this.parentId).subscribe({
      next: (newGroup) => {
        this.groups.push(newGroup);
        this.newGroupName = '';
        this.parentId = null;
        this.loadGroups();
      },
      error: (err) => console.log("Ошибка при добавлении группы", err)
    });
  }



  applyChanges() {
    if (!this.selectedGroup && !this.selectedRole) {
      return;
    }

    if (this.selectedGroup) {
      this.groupService.assignStudentToGroup(this.selectedGroup, this.userId).subscribe({
        next: () => {
          this.selectedGroup = '';
          this.userUpdated.emit();
        },
        error: (err) => console.error("Ошибка при назначении в группу:", err)
      });
    }

    if (this.selectedRole) {
      const roleMethod = this.selectedRole === 'Сотрудник деканата'
        ? this.userService.makeDeanary(this.userId)
        : this.userService.makeTeacher(this.userId);

      roleMethod.subscribe({
        next: () => {
          this.selectedRole = '';
          this.userUpdated.emit();
        },
        error: (err) => console.error(`Ошибка при назначении роли ${this.selectedRole}:`, err)
      });
    }
  }

  trackByGroupId(index: number, group: any): number | string {
    return group.id;
  }
  onParentGroupChange() {
    if (!this.parentId) {
      this.newGroupName = '';
    }
  }


  removeGroup() {
    if (!this.selectedGroupToDelete) {
      alert("Выберите группу для удаления.");
      return;
    }

    this.groupService.getGroupInfo(this.selectedGroup).subscribe({
      next: () => {

      }
    })
    this.groupService.deleteGroup(this.selectedGroupToDelete).subscribe({
      next: () => {
        this.selectedGroupToDelete = '';
        this.newGroupName = '';
        this.parentId = null;
        this.loadGroups();
      },
      error: (err) => {
        console.error("Ошибка при удалении группы:", err);
      }
    });
  }

}
