import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
export interface Kitap {
    id?: number;
    ad?: string;
    yazar?: string;
    yayinevi: string;
    sayfaSayisi: number;
    stok: number;
}
@Injectable({ providedIn: 'root' })
export class KitapService {
  
    private kitaplarUrl = 'https://localhost:7141/api/Kitap';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/JSON' })
    };

    constructor(private http: HttpClient) { }

    getKitaplar(): Observable<Kitap[]> {
        return this.http.get<Kitap[]>(this.kitaplarUrl)
            .pipe(
                tap(_ => console.log('fetched kitaplar'))
            );
    }

  
        updateKitap(kitap: Kitap): Observable<any> {
            return this.http.put(`${this.kitaplarUrl}/${kitap.id}`, kitap, this.httpOptions).pipe(
            tap(_ => console.log(`updated Kitap id=${kitap.id}`))
        );
}

    addKitap(kitap: Kitap): Observable<Kitap> {
        return this.http.post<Kitap>(this.kitaplarUrl, kitap, this.httpOptions).pipe(
        tap((newKitap: Kitap) => console.log(`added kitap w/ id=${newKitap.id}`))
        );
    }
    deleteKitap(id: number | undefined): Observable<Kitap> {

        const url = `${this.kitaplarUrl}/${id}`;

        return this.http.delete<Kitap>(url, this.httpOptions).pipe(
            tap(_ => console.log("Kitap deleted"))
        );
    }
}