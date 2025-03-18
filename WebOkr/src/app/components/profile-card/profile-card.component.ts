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
  wasStudent: boolean = false; 

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
  
    const roles = new Set<string>(); 
  
    if (this.user.role) {
      roles.add(ROLE_MAP[this.user.role] || this.user.role);
    }
  
    if ((this.user.groupId || this.wasStudent) && !roles.has("Студент")) {
      roles.add("Студент");
    }
  
    return Array.from(roles).join(', ');
  }
  

  ngOnChanges() {
    if (this.user) {
      this.patchForm();

      if (this.user.groupId) {
        this.loadUserGroup(this.user.groupId);
        this.wasStudent = true; 
      } else {
        this.userGroup = ' ';
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
