import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, ToastComponent, ConfirmDialogComponent],
  template: `
    <app-toast></app-toast>
    <app-confirm-dialog></app-confirm-dialog>
    <div class="flex h-screen bg-surface overflow-hidden">
      <!-- Sidebar -->
      <app-sidebar [isCollapsed]="isSidebarCollapsed"></app-sidebar>
      
      <!-- Contenu principal -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <app-header (toggleSidebar)="isSidebarCollapsed = !isSidebarCollapsed"></app-header>
        
        <!-- Zone de défilement (Dashboard, Listes...) -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-surface p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;
}
