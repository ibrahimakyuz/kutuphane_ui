import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitaplarComponent } from './kitaplar.component';

describe('KitaplarComponent', () => {
  let component: KitaplarComponent;
  let fixture: ComponentFixture<KitaplarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitaplarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitaplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
