import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  kullaniciAdi = '';
  sifre = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

 goToRegister() {
  this.router.navigate(['/register']);
}
login() {
  this.errorMessage = '';

  this.authService.login({ kullaniciAdi: this.kullaniciAdi, sifre: this.sifre }).subscribe({
    next: (response) => {
      this.authService.saveToken(response.token);

      const decoded: any = jwtDecode(response.token);
      const rol = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const username = decoded["unique_name"] || this.kullaniciAdi;
      localStorage.setItem('rol', rol);
      localStorage.setItem('username', username);  // kullanıcı adını localStorage'a kaydet
      const isAdmin = rol?.toLowerCase() === 'admin';
      this.authService.setAdminStatus(isAdmin);
      this.authService.setUserName(username);

      if (isAdmin) {
        this.router.navigate(['/kitap-list']);
      } else {
        this.router.navigate(['/anasayfa']);
      }
    },
    error: (error) => {
      this.errorMessage = 'Giriş başarısız: ' + (error.error?.message || 'Bilinmeyen hata.');
    }
  });
}

}

  // login() {
  //     this.authService.login({ kullaniciAdi: this.kullaniciAdi, sifre: this.sifre }).subscribe(response => {
  //     this.authService.saveToken(response.token);
  //     localStorage.setItem('rol', response.rol);  // Backend’den rol bilgisini almalısın!
  //     this.authService.setAdminStatus(response.rol === 'admin');
  //     console.log('Giriş başarılı:', response.rol);
  //     console.log('Giriş başarılı:', response.token);
  //     this.router.navigate(['/kitap-list']);

  //   });
  // }
