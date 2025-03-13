import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-main-button',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './navigate-main-button.component.html',
  styleUrl: './navigate-main-button.component.scss'
})
export class NavigateMainButtonComponent {

  constructor(private router: Router) { }
    goToMainPage(){
      this.router.navigate(['main']);
    }
}
