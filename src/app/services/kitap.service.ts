import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Yazar {
  id: number;
  ad: string;
  soyad: string;
}

export interface Kategori {
  id: number;
  ad: string;
}

export interface Kitap {
  id: number;
  ad: string;
  yayinevi: string;
  sayfaSayisi: number;
  stok: number;
  yazar: Yazar;
  kategori: Kategori;
}

@Injectable({
  providedIn: 'root'
})

export class KitapService {
  private apiUrl = 'https://localhost:7141/api/Kitap'; // API adresine göre düzenle

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      return new HttpHeaders({
         'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      });
    }
  getKitaplar(): Observable<Kitap[]> {
    console.log('API URL:', this.apiUrl);
    return this.http.get<Kitap[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
  // // Tüm kitapları getir
  // getKitaplar(): Observable<Kitap[]> {
  //   console.log('API URL:', this.apiUrl);
  //   return this.http.get<Kitap[]>(this.apiUrl);
  // }

  // ID ile kitap getir
  getKitapById(id: number): Observable<Kitap> {
    return this.http.get<Kitap>(`${this.apiUrl}/${id}`);
  }

  // Yeni kitap ekle
  // addKitap(kitap: Kitap): Observable<Kitap> {
  //   return this.http.post<Kitap>(this.apiUrl, kitap);
  // }
  //  addKitap(kitap: Kitap): Observable<any> {
  //   return this.http.post(this.apiUrl, kitap, { headers: this.getAuthHeaders() });
  // }
 addKitap(kitap: Kitap) {
  console.log('Kitap:', kitap);
  console.log('API URL:', this.apiUrl);
  console.log('Headers:', this.getAuthHeaders());
  console.log('Token:', localStorage.getItem('token'));
    return this.http.post(this.apiUrl, kitap, { headers: this.getAuthHeaders() });
  
}

  // Kitap güncelle
  updateKitap(kitap: Kitap): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${kitap.id}`, kitap);
  }

  // Kitap sil
  deleteKitap(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
