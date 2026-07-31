import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-surface-container-lowest/90 backdrop-blur-[20px] h-16 flex items-center justify-between px-8 sticky top-0 z-10 transition-all duration-300 border-b border-surface-container-low">
      
      <!-- Left side: Burger + Title -->
      <div class="flex-1 flex items-center">
        <button (click)="toggleSidebar.emit()" class="mr-4 p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface focus:outline-none flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px]">menu</span>
        </button>
        <h2 class="text-xl font-display font-bold tracking-tight text-on-surface">Espace Administrateur</h2>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center space-x-6">
        
        <!-- Notifications -->
        <button class="relative p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
          <span class="material-symbols-outlined text-[24px]">notifications</span>
          <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
        </button>

        <!-- Profile -->
        <div class="flex items-center space-x-4 cursor-pointer group">
          <div class="hidden md:block text-right">
            <p class="text-[13px] font-medium text-on-surface group-hover:text-primary transition-colors">
              {{ (user$ | async)?.prenom }} {{ (user$ | async)?.nom }}
            </p>
            <p class="text-[11px] text-on-surface-variant mt-0.5">Administrateur</p>
          </div>
          <div class="h-8 w-8 rounded-md bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">
            {{ (user$ | async)?.prenom?.charAt(0) || 'A' }}
          </div>
        </div>
        
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  private authService = inject(AuthService);
  user$ = this.authService.currentUser$;
}
