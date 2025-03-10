import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { AddApplicationButtonComponent } from '../../components/add-application-button/add-application-button.component';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone:true,
  imports: [HeaderComponent,FilterBlockComponent,ApplicationCardComponent, AddApplicationButtonComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  userId:string | null = null;
  user:any;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (currentUser) => {
        console.log('Текущий пользователь:', currentUser);
        this.user = currentUser;
        this.userId = currentUser.id; 
      },
      error: (err) => {
        console.log('Ошибка получения текущего пользователя:', err);
      }
    });
  }

}
  