import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitapService, Kitap } from '../../services/kitap.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-anasayfa',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './anasayfa.component.html',
    styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
    kitaplar: Kitap[] = [];
    filtreliKitaplar: Kitap[] = [];
    filtreMetni: string = '';
selectedKitap: Kitap | null = null;
    constructor(private kitapService: KitapService) { }

    ngOnInit() {
        this.kitapService.getKitaplar().subscribe(data => {
            this.kitaplar = data.slice(0, 40); // sadece ilk 6 kitabı göster
            this.filtreliKitaplar = [...this.kitaplar];
        });
    }

    applyFilter() {
        const filtre = this.filtreMetni.toLowerCase();

        this.filtreliKitaplar = this.kitaplar.filter(k =>
            k.ad.toLowerCase().includes(filtre) ||
            (k.yazar?.ad.toLowerCase().includes(filtre) || false) ||
            (k.yazar?.soyad.toLowerCase().includes(filtre) || false) ||
            k.yayinevi.toLowerCase().includes(filtre)  // Yayın evi ekledik
        );
    }

    kartTiklandi(kitap: Kitap) {
  this.selectedKitap = kitap;
}

kapat() {
  this.selectedKitap = null;
}

}
