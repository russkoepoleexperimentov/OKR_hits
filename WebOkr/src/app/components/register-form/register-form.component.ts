import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { PhoneMaskDirective } from '../../utils/phoneMask';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ButtonComponent, PhoneMaskDirective, FormsModule, MatIconModule,FontAwesomeModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  isPasswordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(registerForm: NgForm): void {
    if (registerForm.valid) {
      const jsonData = JSON.stringify(registerForm.value);
      console.log('Данные формы:', jsonData);
    } else {
      registerForm.control.markAllAsTouched();
    }
  }
}