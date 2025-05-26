import { Component, OnInit } from '@angular/core';
import { KitapService, Kitap } from '../../services/kitap.service';
import { YazarService, Yazar } from '../../core/yazar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KategoriService,Kategori } from '../../core/kategori.service';

@Component({
  selector: 'app-kitap-form',
  templateUrl: './kitap-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./kitap-form.component.css']
})
export class KitapFormComponent implements OnInit {
  kitap: Kitap = {
    id: 0,
    ad: '',
    yayinevi: '',
    sayfaSayisi: 0,
    stok: 0,
    yazar: {
      id: 0,
      ad: '',
      soyad: ''
    },
    kategori: {
      id: 0,
      ad: ''
    }
  };

  yazarlar: Yazar[] = [];
  kategoriler: Kategori[] = [];

  constructor(
    private kitapService: KitapService,
    private yazarService: YazarService,
    private kategoriService: KategoriService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.yazarService.getAll().subscribe(data => this.yazarlar = data);
    this.kategoriService.getAll().subscribe(data => this.kategoriler = data);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.kitapService.getKitapById(+id).subscribe(data => {
        this.kitap = data;
      });
    }
  }

  kaydet() {
    if (this.kitap.id === 0) {
      this.kitapService.addKitap(this.kitap).subscribe(() => this.router.navigate(['/kitaplar']));
    } else {
      this.kitapService.updateKitap(this.kitap).subscribe(() => this.router.navigate(['/kitaplar']));
    }
  }
}
