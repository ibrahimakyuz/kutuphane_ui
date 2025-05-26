import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Kategori {
  id: number;
  ad: string;
}

@Injectable({
  providedIn: 'root'
})
export class KategoriService {
  private apiUrl = 'https://localhost:7141/api/Kategori'; // Backend'deki Kategori API endpoint'i

  constructor(private http: HttpClient) {}

  getAll(): Observable<Kategori[]> {
    return this.http.get<Kategori[]>(this.apiUrl);
  }
}
