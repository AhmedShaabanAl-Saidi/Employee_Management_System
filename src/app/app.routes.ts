import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { authGuard } from './Core/guards/authantactions/auth.guard';
import { loggedGuard } from './Core/guards/logged/logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate : [loggedGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: '**',
        component: NotFoundComponent,
        title: 'Error',
      },
    ],
  },
];
