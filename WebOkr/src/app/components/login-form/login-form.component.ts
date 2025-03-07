import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ButtonComponent, CommonModule,FontAwesomeModule, MatIconModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  isPasswordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  togglePasswordVisibility(): void { 
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const jsonData = JSON.stringify(loginForm.value);
      console.log('Данные формы:', jsonData);
    }else{
      console.log('Ошибка');
    }
  }
}
