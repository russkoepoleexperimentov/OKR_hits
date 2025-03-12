import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/UserService/user-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule,  CommonModule,FontAwesomeModule, MatIconModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  isPasswordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;


  constructor(private userService: UserServiceService,private router:Router ){}

  togglePasswordVisibility(): void { 
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {

      const {  email, password } = loginForm.value;

      this.userService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);

          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.log('Reg Error', err);
        }
      });
    } else {
      loginForm.control.markAllAsTouched();
    }
  }
}
