import { Component, OnInit } from '@angular/core';
import { OduncService } from '../../core/odunc.service';
import { Odunc } from '../../models/odunc.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-odunc-gecmis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './odunc-gecmis.component.html',
  styleUrls: ['./odunc-gecmis.component.css'],
})
export class OduncGecmisComponent implements OnInit {
  oduncGecmisi: Odunc[] = [];
  loading = false;
  error = '';

  constructor(private oduncService: OduncService) { }

  ngOnInit() {
    this.yukle();
  }

  yukle() {
    this.loading = true;
    this.oduncService.getGecmis().subscribe({
      next: (data: Odunc[]) => {
        this.oduncGecmisi = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Ödünç geçmişi yüklenirken hata oluştu.';
        this.loading = false;
      },
    });
  }

  iadeEt(kitapId: number) {
    if (!confirm('Bu kitabı iade etmek istediğinize emin misiniz?')) return;

    this.oduncService.iadeEt(kitapId).subscribe({
      next: (mesaj) => {
        alert(mesaj); // "Kitap başarıyla iade edildi."
        this.yukle(); // Listeyi yenile
      },
      error: () => {
        alert('İade işlemi sırasında bir hata oluştu.');
      }
    });
  }
}
