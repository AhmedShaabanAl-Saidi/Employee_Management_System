import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plat_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plat_id)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
