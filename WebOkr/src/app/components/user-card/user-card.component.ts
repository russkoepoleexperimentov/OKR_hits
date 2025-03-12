import { Component } from '@angular/core';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  users: any[] = [];

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  goToProfile(userId: string) {
    this.router.navigate(['profile', userId]);
  }
}
