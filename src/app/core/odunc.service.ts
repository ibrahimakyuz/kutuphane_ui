import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Odunc } from '../models/odunc.model';
import { Observable } from 'rxjs';
import { AdminOdunc } from '../pages/admin-odunc-listesi/admin-odunc.model';
@Injectable({ providedIn: 'root' })
export class OduncService {
  private apiUrl = 'https://localhost:7141/api/Odunc';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  oduncAl(kitapId: number) {

    return this.http.post(`${this.apiUrl}/al/${kitapId}`, {}, this.getAuthHeaders());
  }

  getGecmis(): Observable<Odunc[]> {
    return this.http.get<Odunc[]>(`${this.apiUrl}/gecmis`);
  }

  iadeEt(kitapId: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/iade/${kitapId}`, {}, { responseType: 'text' });
  }

  getTumOdunclar(): Observable<AdminOdunc[]> {
    return this.http.get<AdminOdunc[]>(`${this.apiUrl}/admin/odunclar`);
  }

  getTumGecmis(): Observable<Odunc[]> {
  return this.http.get<Odunc[]>(`${this.apiUrl}/tum-gecmis`);
}
}
