import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div [ngClass]="isCollapsed ? 'w-20' : 'w-64'" class="h-full bg-surface-container-lowest flex flex-col z-20 transition-all duration-300 whitespace-nowrap border-r border-surface-container-low">
      
      <!-- Logo Area -->
      <div class="flex items-center justify-center h-16 px-4 border-b border-surface-container-low">
        <img *ngIf="!isCollapsed" src="/logo_padded.png" alt="Livrauto Logo" class="h-16 w-auto object-contain scale-[1.35] origin-center">
        <!-- Icône simplifiée pour le mode réduit -->
        <div *ngIf="isCollapsed" class="h-8 w-8 bg-primary-container text-on-primary rounded-lg flex items-center justify-center font-bold font-display text-lg">
          L
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto py-4 px-4 overflow-x-hidden">
        <div *ngIf="!isCollapsed" class="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 transition-opacity">Gestion</div>
        <div *ngIf="isCollapsed" class="h-px mb-4 bg-surface-container-low w-8 mx-auto mt-2"></div>
        
        <nav class="space-y-2">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-surface-container-low text-primary shadow-sm" 
             [routerLinkActiveOptions]="{exact: true}"
             [title]="isCollapsed ? 'Tableau de Bord' : ''"
             [ngClass]="isCollapsed ? 'justify-center px-0' : 'px-4'"
             class="group flex items-center py-3 text-sm font-medium rounded-md text-on-surface-variant hover:bg-surface-container-low/50 transition-all duration-300">
            <span class="material-symbols-outlined text-[20px] transition-colors" [ngClass]="{'mr-4': !isCollapsed, 'text-primary': currentRoute === '/admin/dashboard'}">grid_view</span>
            <span *ngIf="!isCollapsed">Tableau de Bord</span>
          </a>

          <a routerLink="/admin/utilisateurs" routerLinkActive="bg-surface-container-low text-primary shadow-sm"
             [title]="isCollapsed ? 'Utilisateurs' : ''"
             [ngClass]="isCollapsed ? 'justify-center px-0' : 'px-4'"
             class="group flex items-center py-3 text-sm font-medium rounded-md text-on-surface-variant hover:bg-surface-container-low/50 transition-all duration-300">
            <span class="material-symbols-outlined text-[20px] transition-colors" [ngClass]="{'mr-4': !isCollapsed, 'text-primary': currentRoute.includes('/admin/utilisateurs')}">group</span>
            <span *ngIf="!isCollapsed">Utilisateurs</span>
          </a>

          <a href="#" [title]="isCollapsed ? 'Commandes' : ''" [ngClass]="isCollapsed ? 'justify-center px-0' : 'px-4'" class="group flex items-center py-3 text-sm font-medium rounded-md text-on-surface-variant hover:bg-surface-container-low/50 transition-all duration-300">
            <span class="material-symbols-outlined text-[20px]" [ngClass]="{'mr-4': !isCollapsed}">shopping_cart</span>
            <span *ngIf="!isCollapsed">Commandes</span>
          </a>

          <a href="#" [title]="isCollapsed ? 'Finances' : ''" [ngClass]="isCollapsed ? 'justify-center px-0' : 'px-4'" class="group flex items-center py-3 text-sm font-medium rounded-md text-on-surface-variant hover:bg-surface-container-low/50 transition-all duration-300">
            <span class="material-symbols-outlined text-[20px]" [ngClass]="{'mr-4': !isCollapsed}">account_balance_wallet</span>
            <span *ngIf="!isCollapsed">Finances</span>
          </a>
        </nav>
      </div>

      <!-- Footer Action -->
      <div class="p-4 overflow-hidden">
        <button (click)="logout()" [title]="isCollapsed ? 'Déconnexion' : ''" 
                [ngClass]="isCollapsed ? 'justify-center px-0' : 'px-4'"
                class="flex items-center w-full py-3 text-sm font-medium text-on-surface-variant rounded-md hover:bg-error-container hover:text-error transition-all duration-300 group">
          <span class="material-symbols-outlined text-[22px] group-hover:text-error" [ngClass]="{'mr-4': !isCollapsed}">logout</span>
          <span *ngIf="!isCollapsed">Déconnexion</span>
        </button>
      </div>
    </div>
  `
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  currentRoute = '';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  logout() {
    this.authService.logout();
  }
}
