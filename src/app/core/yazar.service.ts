import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Yazar {
  id: number;
  ad: string;
  soyad: string;
}

@Injectable({
  providedIn: 'root'
})
export class YazarService {
  private apiUrl = 'https://localhost:7141/api/Yazar'; // Backend'deki Yazar API endpoint'i

  constructor(private http: HttpClient) {}

  getAll(): Observable<Yazar[]> {
    return this.http.get<Yazar[]>(this.apiUrl);
  }
}
