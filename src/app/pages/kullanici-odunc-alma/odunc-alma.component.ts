// src/app/pages/odunc-al/odunc-al.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KitapService, Kitap } from '../../services/kitap.service';
import { OduncService } from '../../core/odunc.service';

@Component({
  selector: 'app-odunc-alma',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './odunc-alma.component.html',
  styleUrls: ['./odunc-alma.component.css']
})
export class OduncAlmaComponent implements OnInit {
  kitaplar: Kitap[] = [];
  filteredKitaplar: Kitap[] = [];
  filtre: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private kitapService: KitapService, private oduncService: OduncService) {}

  ngOnInit() {
    // this.kitapService.getKitaplar().subscribe(data => {
    //   this.kitaplar = data;
    //   this.applyFilter();
    // });
    this.kitapService.getKitaplar().subscribe(data => {
    // Sadece stok > 0 olan kitapları al
    this.kitaplar = data.filter(k => k.stok > 0);
    this.applyFilter();
  });
  }

  applyFilter() {
    if (this.filtre.trim()) {
      this.filteredKitaplar = this.kitaplar.filter(k =>
        k.ad.toLowerCase().includes(this.filtre.toLowerCase())
      );
    } else {
      this.filteredKitaplar = [...this.kitaplar];
    }
    this.totalPages = Math.ceil(this.filteredKitaplar.length / this.pageSize);
    this.currentPage = 1;
  }

  get pagedKitaplar() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredKitaplar.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if(page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  oduncAl(kitap: Kitap) {
    this.oduncService.oduncAl(kitap.id).subscribe({
      next: () => {
        alert(`"${kitap.ad}" ödünç alındı!`);
        kitap.stok--; // anlık stok azaltma
        if (kitap.stok === 0) {
          this.kitaplar = this.kitaplar.filter(k => k.stok > 0);
          this.applyFilter();
        }
      },
      error: (err) => {
        console.error(err);
        alert(`Ödünç alma başarısız: ${err.error?.message || 'Sunucu hatası'}`);
      }
    });
  }
}
