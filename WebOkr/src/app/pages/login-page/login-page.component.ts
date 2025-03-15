import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { NavigateBackButtonComponent } from '../../components/navigate-back-button/navigate-back-button.component';

@Component({
  selector: 'app-login-page',
  imports: [HeaderComponent,LoginFormComponent,NavigateBackButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
