import { Component } from '@angular/core';
import { PhoneMaskDirective } from '../../utils/phoneMask';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ PhoneMaskDirective, FormsModule, MatIconModule, FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  isPasswordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private userService: UserServiceService, private router: Router) { }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(registerForm: NgForm): void {
    if (registerForm.valid) {

      const { name, surname,lastname, email, password, phoneNumber } = registerForm.value;
      const credentials = `${name} ${surname} ${lastname}`.trim();
      const normalizedPhone: string = phoneNumber
        ? String(phoneNumber).replace(/\D/g, '')
        : '';



      this.userService.register(email, password, credentials, normalizedPhone).subscribe({
        next: (response) => {
          console.log('Пользователь зарегистрирован:', response.token);
          localStorage.setItem('token', response.token);

          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.log('Reg Error', err);
        }
      });
    } else {
      registerForm.control.markAllAsTouched();
    }
  }

}