import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent  {
  @Input() user: any;
  @Input() groupName:string='';

  constructor(private router: Router) { }

  goToProfile(userId: string) {
    this.router.navigate(['profile', userId]);
  }
}
