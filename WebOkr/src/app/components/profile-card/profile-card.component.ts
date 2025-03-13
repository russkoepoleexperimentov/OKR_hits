import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../services/Group/group.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnChanges {
  @Input() user: any;
  @Output() confirmUpdate = new EventEmitter<any>();
  isEditing = false;
  profileForm: FormGroup;
  userGroup: string = '';

  constructor(private fb: FormBuilder, private groupService: GroupService) {
    this.profileForm = this.fb.group({
      credentials: [''],
      email: [''],
      phone: ['']
    });
  }

  isAdminOrDeanery(): boolean {
    return this.user?.role === 'Admin' || this.user?.role === 'Deanery';
  }

  getUserRoles(): string {
    const ROLE_MAP: { [key: string]: string } = {
      "Student": "Студент",
      "Teacher": "Учитель",
      "Deneary": "Сотрудник деканата",
      "Admin": "Админ"
    };

    if (!this.user) return '';

    const roles: string[] = [];

    if (this.user.role) {
      roles.push(ROLE_MAP[this.user.role] || this.user.role);
    }

    if (this.user.groupId && this.user.role !== 'Student') {
      roles.push("Студент");
    }

    return roles.join(', ');
  }

  ngOnChanges() {
    if (this.user) {
      this.patchForm();
      if (this.user.groupId) {
        this.loadUserGroup(this.user.groupId);
      }
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

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.isEditing = false;
      this.confirmUpdate.emit(this.profileForm.value);
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.patchForm();
  }

  private patchForm() {
    this.profileForm.patchValue({
      credentials: this.user.credentials,
      email: this.user.email,
      phone: this.user.phone
    });
  }
}
