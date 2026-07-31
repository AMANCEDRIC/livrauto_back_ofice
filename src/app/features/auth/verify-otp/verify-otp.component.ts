import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #otpForm="ngForm" class="space-y-8">
      
      <div class="text-center mb-6">
        <h3 class="text-xl font-display font-bold text-on-surface">Vérification en deux étapes</h3>
        <p class="text-xs text-on-surface-variant mt-2 font-body">Entrez le code envoyé sur votre boîte mail pour continuer.</p>
      </div>

      <div class="space-y-6">
        <div>
          <label for="otpCode" class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 text-center">
            Code de sécurité
          </label>
          <div class="relative">
            <input id="otpCode" name="otp" type="text" [(ngModel)]="otp" required
                   maxlength="6"
                   class="block w-full bg-surface-container-low text-on-surface text-center text-2xl font-display tracking-[0.5em] py-3 rounded-md border-b-2 border-transparent focus:border-primary focus:bg-surface-container-lowest focus:shadow-ambient transition-all outline-none"
                   placeholder="000000">
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
        <button type="submit" [disabled]="otpForm.invalid || loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container hover:shadow-ambient focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <span *ngIf="loading" class="material-symbols-outlined animate-spin mr-2 text-[20px]">progress_activity</span>
          {{ loading ? 'Vérification...' : 'Valider' }}
        </button>
      </div>
      
    </form>
  `
})
export class VerifyOtpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  otp = '';
  loading = false;
  errorMessage = '';

  constructor() {
    if (!this.authService.pendingEmailFor2FA) {
      this.router.navigate(['/auth/login']);
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.verify2Fa(this.otp).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Code OTP invalide';
      }
    });
  }

  cancel() {
    this.authService.pendingEmailFor2FA = null;
    this.router.navigate(['/auth/login']);
  }
}
