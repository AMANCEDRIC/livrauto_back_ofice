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
    { label: 'Missions', route: '/admin/missions', icon: 'map' },
    { label: 'Utilisateurs', route: '/admin/utilisateurs', icon: 'users' },
    { label: 'Paiements', route: '/admin/paiements', icon: 'credit-card' },
    { label: 'Audit & Logs', route: '/admin/logs', icon: 'activity' },
    { label: 'Paramètres', route: '/admin/parametres', icon: 'settings' }
  ];

  logout() {
    this.authService.logout();
  }
}
