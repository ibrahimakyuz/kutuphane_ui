import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitapService, Kitap } from '../../services/kitap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitaplar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitapkart.component.html',
  styleUrls: ['./kitapkart.component.css']
})
export class KitapKartComponent implements OnInit {
  kitaplar: Kitap[] = [];

  constructor(
    private kitapService: KitapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kitapService.getKitaplar().subscribe({
      next: (data) => this.kitaplar = data,
      error: () => console.error('Kitaplar yüklenemedi.')
    });
  }

  oduncSayfasinaGit(kitapId: number) {
    this.router.navigate(['/odunc-al', kitapId]);
  }
}
