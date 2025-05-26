import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { KitaplarComponent } from './pages/kitap/kitaplar.component';
import { KitapFormComponent } from './pages/kitap-form/kitap-form.component';
import { authGuard } from './core/auth.guard';
import { KitapListesiComponent } from './pages/kitaplar/kitap-list.component';
import { KitapKartComponent } from './pages/kitap-kartları/kitapkart.component';
import { OduncAlComponent } from './pages/oduncalma/odunc-al.component';
import { OduncGecmisComponent } from './pages/oduncgecmis/odunc-gecmis.component';
import { RegisterComponent } from './pages/kullanici-kayit/register.component';
import { AdminOdunclarComponent } from './pages/admin-odunc-listesi/admin-odunclar.component';
import { AdminTumGecmisComponent } from './pages/admin-tum-odunc-listesi/admin-tum-gecmis.component';
import { OduncAlmaComponent } from './pages/kullanici-odunc-alma/odunc-alma.component';
import { AnasayfaComponent } from './pages/anasayfa/anasayfa.component';
import { UyeListesiComponent } from './pages/uye-listesi/uye-listesi.component';

export const routes: Routes = [
  
  //{ path: '', component: KitapKartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'kitap-form', component: KitapFormComponent },
  { path: 'kitap-list', component: KitapListesiComponent },
  { path: 'odunc-al', component: KitapKartComponent },
  { path: 'kitap-duzenle/:id', component: KitapFormComponent },
  { path: 'kitap-ekle', component: KitapFormComponent },
  { path: 'kitaplar', component: KitaplarComponent },
  { path: 'odunc-al/:kitapId', component: OduncAlComponent  },
  { path: 'odunc-gecmis', component: OduncGecmisComponent  },
   { path: 'odunc-gecmis', component: OduncGecmisComponent  },
   { path: 'register', component: RegisterComponent },
   { path: 'admin/odunclar', component: AdminOdunclarComponent
    },// canActivate: [AdminGuard] }
 { path: 'admin/tum', component: AdminTumGecmisComponent
    },
    { path: 'odunc-alma', component: OduncAlmaComponent },
{ path: '', component: AnasayfaComponent },
{ path: 'anasayfa', component: AnasayfaComponent },
{ path: 'admin/uyeler', component:  UyeListesiComponent},

];
