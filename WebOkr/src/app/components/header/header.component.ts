import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/UserService/user-service.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() userId: string | null = null;
  @Input() userLink: string = '';
  @Input() userRole: string | null = null;
  @Input() currentUserId: string | null = null;
  

  isDropdownOpen: boolean = false;
  private ignoredRoutes = ['/', '/login', '/register'];
  private userCheckTimeout: any;

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    if (this.ignoredRoutes.includes(this.router.url)) {
      return;
    }

    this.userService.getUserProfile().subscribe({
      next: (user) => {
        if (user && user.credentials) {
          this.title = user.credentials;
        }
        this.setupUserCheck(); 
      },
      error: () => {
        this.setupUserCheck(); 
      }
    });
  }

  setupUserCheck() {
    this.userCheckTimeout = setTimeout(() => {
      if (!this.title || this.title.trim() === '') {
        console.warn("User name not loaded. Redirecting to login...");
        this.logout();
      }
    }, 5000);
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('token');
    clearTimeout(this.userCheckTimeout);
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  goToProfile() {
    if (this.currentUserId) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/profile', this.currentUserId]);
      });
    }
  }
}
