import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      credentials: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.patchForm();
    }
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
