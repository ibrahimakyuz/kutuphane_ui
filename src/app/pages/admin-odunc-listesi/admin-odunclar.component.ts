import { Component, OnInit } from '@angular/core';
import { OduncService } from '../../core/odunc.service';
import { AdminOdunc } from './admin-odunc.model';
import { CommonModule } from '@angular/common'; 

@Component({
  imports: [CommonModule], 
  selector: 'app-admin-odunclar',
  templateUrl: './admin-odunclar.component.html',
  styleUrls: ['./admin-odunclar.component.css']
})
export class AdminOdunclarComponent implements OnInit {
  odunclar: AdminOdunc[] = [];
  loading = false;
  error = '';

  constructor(private oduncService: OduncService) {}

  ngOnInit(): void {
    this.yukle();
  }

  yukle() {
    this.loading = true;
    this.oduncService.getTumOdunclar().subscribe({
      next: (data) => {
        this.odunclar = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Ödünç listesi yüklenirken hata oluştu.';
        this.loading = false;
      }
    });
  }
  
}
