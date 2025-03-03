import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { PhoneMaskDirective } from '../../utils/phoneMask';

@Component({
  selector: 'app-register-form',
  standalone:true,
  imports: [ButtonComponent,PhoneMaskDirective],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

}
