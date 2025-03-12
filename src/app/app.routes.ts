import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full',
  },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading.page').then( m => m.LoadingPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-up-or-login',
    loadComponent: () => import('./sign-up-or-login/sign-up-or-login.page').then( m => m.SignUpOrLoginPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'forgot-email',
    loadComponent: () => import('./forgot-email/forgot-email.page').then( m => m.ForgotEmailPage)
  },
  {
    path: 'rsa-result',
    loadComponent: () => import('./rsa-result/rsa-result.page').then( m => m.RSAResultPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
];
