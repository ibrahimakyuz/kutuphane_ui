import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7141/api/Auth';

  constructor(private http: HttpClient) {}

  login(credentials: { kullaniciAdi: string; sifre: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');//return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
   kullaniciAdminMi(): boolean {
  if (typeof window !== 'undefined') {
    const rol = localStorage.getItem('rol');
    return rol === 'admin';
  }
  return false;
}
}