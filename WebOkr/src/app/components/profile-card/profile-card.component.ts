import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() user: any; 

  editProfile() {
    console.log('Редактирование профиля:', this.user);
  }
}
