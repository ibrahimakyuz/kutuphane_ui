// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = () => {
//   const token = localStorage.getItem('token');
//   if (token) return true;

//   const router = inject(Router);
//   router.navigate(['/login']);
//   return false;
// };
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // ✅ Doğru
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false; // Sunucu tarafında hiçbir rota çalıştırma
  }

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) return true;

  router.navigate(['/login']);
  return false;
};