import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  private authService = inject(AuthService);
  
  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'layout-dashboard', exact: true },
    // { label: 'Commandes', route: '/admin/commandes', icon: 'shopping-bag' },
    // { label: 'Missions', route: '/admin/missions', icon: 'map' },
    { label: 'Utilisateurs', route: '/admin/utilisateurs', icon: 'users' },
    { label: 'Paiements', route: '/admin/paiements', icon: 'credit-card' },
    // { label: 'Commissions', route: '/admin/commissions', icon: 'percent' },
    // { label: 'Notifications', route: '/admin/notifications', icon: 'bell' },
    // { label: 'Statistiques', route: '/admin/statistiques', icon: 'bar-chart-3' },
    // { label: 'Paramètres', route: '/admin/parametres', icon: 'settings' }
  ];

  logout() {
    this.authService.logout();
  }
}
