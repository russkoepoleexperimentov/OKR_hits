import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [HeaderComponent,RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

}
