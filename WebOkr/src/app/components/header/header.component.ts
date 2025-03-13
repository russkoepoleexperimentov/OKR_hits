import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() userId: string | null = null;
  @Input() userLink:string='';
  @Input() userRole: string | null = null;
  @Input() currentUserId:string|null=null;
  isDropdownOpen: boolean = false;


  constructor(private eRef: ElementRef, private router: Router) { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href="/login";
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  goToProfile() {
    console.log("Переход в профиль, userId:", this.currentUserId);
    if (this.currentUserId) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/profile', this.currentUserId]);
        });
    }
}


}
