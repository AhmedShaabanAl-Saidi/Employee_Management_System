import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly _Router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  isLogin: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loginStatus = localStorage.getItem('isLoggedIn');
      this.isLogin = loginStatus === 'true';
    }
  }

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
    }
    this._Router.navigate(['/login']);
  }
}
