import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'app-uye-listesi',
  imports: [
    FormsModule,
    CommonModule,
    PaginatorModule,
    TableModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './uye-listesi.component.html',
  styleUrls: ['./uye-listesi.component.css']
})
export class UyeListesiComponent implements OnInit {
  uyeler: any[] = [];
  selectedUye: any = null;

  roller = [
    { label: 'Kullanici', value: 'Kullanici' },
    { label: 'Admin', value: 'Admin' }
  ];

  private apiUrl = 'https://localhost:7141/api/Auth';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUyeler();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUyeler(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${this.apiUrl}/kullanicilar`, { headers }).subscribe({
      next: data => this.uyeler = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Üyeler yüklenemedi!' })
    });
  }

  openUpdateModal(uye: any): void {
    this.selectedUye = { ...uye };
  }

  closeModal(): void {
    this.selectedUye = null;
  }

  updateUye(): void {
    if (!this.selectedUye) return;

    const headers = this.getAuthHeaders();
    this.http.put(`${this.apiUrl}/${this.selectedUye.id}`, this.selectedUye, { headers, responseType: 'text' }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Üye bilgileri güncellendi.' });
        this.closeModal();
        this.getUyeler();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Üye bilgileri güncellenemedi.' })
    });
  }

  toggleRol(uye: any): void {
    const yeniRol = uye.rol === 'Admin' ? 'Kullanici' : 'Admin';
    const headers = this.getAuthHeaders();

    this.http.put(`${this.apiUrl}/${uye.id}/rol`, yeniRol, { headers, responseType: 'text' }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Rol güncellendi.' });
        this.getUyeler();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Rol güncellenemedi.' })
    });
  }

  deleteUye(id: number): void {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      const headers = this.getAuthHeaders();

      this.http.delete(`${this.apiUrl}/${id}`, { headers, responseType: 'text' }).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Silindi', detail: 'Kullanıcı silindi.' });
          this.getUyeler();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Kullanıcı silinemedi.' })
      });
    }
  }
}
