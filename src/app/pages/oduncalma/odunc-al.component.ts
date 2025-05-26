import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OduncService } from '../../core/odunc.service';

@Component({
  selector: 'app-odunc-al',
  templateUrl: './odunc-al.component.html',
 
})
export class OduncAlComponent implements OnInit {
  kitapId!: number;

  constructor(
    private route: ActivatedRoute,
    private oduncService: OduncService
  ) {}

  ngOnInit(): void {
    this.kitapId = Number(this.route.snapshot.paramMap.get('kitapId'));
  }

  oduncAl() {
    this.oduncService.oduncAl(this.kitapId).subscribe({
      next: () => alert('Kitap başarıyla ödünç alındı.'),
      error: (err) => {
  console.error(err); // Bu satırı ekle
  console.log('Ödünç alma işlemi başarısız.'); // Bu satırı ekle
  alert('Ödünç alma işlemi başarısız.');
}
    });
  }
}
