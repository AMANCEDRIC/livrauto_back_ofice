import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-8">
      
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Adresse Email
          </label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-70 text-[20px]">mail</span>
            <input id="email" name="email" type="email" [(ngModel)]="email"
                   class="block w-full bg-surface-container-low text-on-surface text-sm py-3 pl-10 pr-4 rounded-md border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest focus:shadow-ambient transition-all outline-none"
                   placeholder="admin@livreauto.com" required>
          </div>
        </div>

        <div>
          <label for="password" class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Mot de passe
          </label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-70 text-[20px]">lock</span>
            <input id="password" name="password" type="password" [(ngModel)]="password"
                   class="block w-full bg-surface-container-low text-on-surface text-sm py-3 pl-10 pr-4 rounded-md border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest focus:shadow-ambient transition-all outline-none"
                   placeholder="••••••••" required>
          </div>
        </div>
      </div>

      <div *ngIf="errorMessage" class="bg-error-container border-l-4 border-error p-4 rounded-r-md">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-error mr-3">error</span>
          <p class="text-sm text-error font-medium">{{ errorMessage }}</p>
        </div>
      </div>

      <div>
        <button type="submit" [disabled]="loginForm.invalid || loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container hover:shadow-ambient focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <span *ngIf="loading" class="material-symbols-outlined animate-spin mr-2 text-[20px]">progress_activity</span>
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </div>
      
    </form>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        if (this.authService.pendingEmailFor2FA) {
          this.router.navigate(['/auth/2fa']);
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Identifiants incorrects';
      }
    });
  }
}
