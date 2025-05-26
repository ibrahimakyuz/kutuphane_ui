import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './core/auth.service'; // yolunu ayarla

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;
  isUser = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.adminStatus$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      this.isUser = !isAdmin && localStorage.getItem('rol')?.toLowerCase() === 'kullanici';
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.username$.subscribe(name => {
    this.username = name;
  });
    console.log('Navbar kullanıcı adı:', this.username);
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}