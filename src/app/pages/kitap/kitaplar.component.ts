import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitapService, Kitap } from '../../services/kitap.service';
@Component({
  selector: 'app-kitaplar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitaplar.component.html',
  styleUrls: ['./kitaplar.component.css']
})

export class KitaplarComponent implements OnInit {
  kitaplar: Kitap[] = [];

  constructor(private kitapService: KitapService) {}

  ngOnInit(): void {
    this.kitapService.getKitaplar().subscribe({
      next: (data) => this.kitaplar = data,
      error: () => console.error('Kitaplar yüklenemedi.')
    });
  }
}
