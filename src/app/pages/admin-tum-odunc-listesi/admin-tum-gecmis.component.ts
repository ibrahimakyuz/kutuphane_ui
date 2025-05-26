import { Component, OnInit } from '@angular/core';
import { OduncService } from '../../core/odunc.service';
import { Odunc } from '../../models/odunc.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-tum-gecmis',
  templateUrl: './admin-tum-gecmis.component.html',
    styleUrls: ['./admin-tum-gecmis.component.css'],
  imports: [CommonModule]
  
})
export class AdminTumGecmisComponent implements OnInit {
  oduncGecmisi: Odunc[] = []; // ✅ Bu satır eksikti
  loading = false;
  error = '';

  constructor(private oduncService: OduncService) {}

  ngOnInit(): void {
    this.yukle();
  }

  yukle(): void {
    this.loading = true;
    this.oduncService.getTumGecmis().subscribe({
      next: (data) => {
        this.oduncGecmisi = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Ödünç geçmişi yüklenirken hata oluştu.';
        this.loading = false;
      }
    });
  }
}
