import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { VerifyOtpComponent } from './features/auth/verify-otp/verify-otp.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UtilisateursComponent } from './features/utilisateurs/utilisateurs.component';
import { UtilisateurDetailsComponent } from './features/utilisateurs/utilisateur-details.component';
import { PaiementsComponent } from './features/paiements/paiements.component';
import { MissionsComponent } from './features/missions/missions.component';
import { LogsComponent } from './features/logs/logs.component';
import { ParametresComponent } from './features/parametres/parametres.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '2fa', component: VerifyOtpComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'utilisateurs', component: UtilisateursComponent },
      { path: 'utilisateurs/:id', component: UtilisateurDetailsComponent },
      { path: 'missions', component: MissionsComponent },
      { path: 'paiements', component: PaiementsComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'parametres', component: ParametresComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
