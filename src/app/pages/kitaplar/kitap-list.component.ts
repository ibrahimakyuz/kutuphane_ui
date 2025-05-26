import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitapService, Kitap } from '../../services/kitap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitaplar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitap-list.component.html',
  styleUrls: ['./kitap-list.component.css']
})
export class KitapListesiComponent implements OnInit {
  kitaplar: Kitap[] = [];

  constructor(private kitapService: KitapService, private router: Router) {}

  ngOnInit(): void {
    this.listeyiYukle();
  }

  listeyiYukle() {
    this.kitapService.getKitaplar().subscribe({
      next: (data) => this.kitaplar = data,
      error: () => console.error('Kitaplar yüklenemedi.')
    });
  }

  yeniKitapEkle() {
    this.router.navigate(['/kitap-ekle']);
  }

  guncelle(kitap: Kitap) {
    this.router.navigate(['/kitap-duzenle', kitap.id]);
  }

  sil(id: number) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.kitapService.deleteKitap(id).subscribe(() => this.listeyiYukle());
    }
  }
}