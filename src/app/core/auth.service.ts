import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7141/api/Auth';

  // Admin durumunu yaymak için BehaviorSubject, başlangıçta false
  private adminStatus = new BehaviorSubject<boolean>(false);
  adminStatus$ = this.adminStatus.asObservable();

  // Kullanıcı adını yaymak için BehaviorSubject, başlangıçta null
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Tarayıcıdaysak localStorage'dan değerleri alıp BehaviorSubject'leri güncelle
      const isAdmin = this.checkAdminStatus();
      this.adminStatus.next(isAdmin);

      const storedUsername = localStorage.getItem('username');
      this.usernameSubject.next(storedUsername);
    }
  }

  login(credentials: { kullaniciAdi: string; sifre: string }): Observable<{ token: string, rol: string }> {
    return this.http.post<{ token: string, rol: string }>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('username');
    }
    this.setUserName(null);
    this.adminStatus.next(false);
    console.log('Çıkış yapıldı.');
  }

  // Kullanıcının admin olup olmadığını kontrol eden private fonksiyon
  private checkAdminStatus(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const rol = localStorage.getItem('rol');
      return rol?.toLowerCase() === 'admin';
    }
    return false;
  }

  kullaniciAdminMi(): boolean {
    return this.checkAdminStatus();
  }

  // Login sonrası admin durumunu güncellemek için çağrılacak
  setAdminStatus(isAdmin: boolean) {
    this.adminStatus.next(isAdmin);
  }

  register(dto: any): Observable<string> {
    console.log('Register DTO:', dto);
    return this.http.post(`${this.apiUrl}/register`, dto, { responseType: 'text' });
  }

  getCurrentUserName(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('username');
    }
    return null;
  }

  setUserName(username: string | null) {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (username) {
        localStorage.setItem('username', username);
      } else {
        localStorage.removeItem('username');
      }
    }
    this.usernameSubject.next(username);
  }
}
