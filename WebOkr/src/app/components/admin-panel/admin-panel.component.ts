import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @Input() userId!: string;
  isAdmin: boolean = true;
  roles = ['Учитель', 'Сотрудник деканата'];
  groups: any[] = [];
  selectedRole: string = '';
  selectedGroup: string = '';

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    
  }
  
  applyChanges(){
    console.log("da");
  }
}
