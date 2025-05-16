import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plat_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plat_id)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
