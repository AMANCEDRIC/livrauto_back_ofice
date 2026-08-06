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
    <form (ngSubmit)="onSubmit()" class="space-y-8">
      
      <div class="text-center mb-6">
        <h3 class="text-xl font-display font-bold text-on-surface">Vérification en deux étapes</h3>
        <p class="text-xs text-on-surface-variant mt-2 font-body">Entrez le code envoyé sur votre boîte mail pour continuer.</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4 text-center">
            Code de sécurité
          </label>
          <div class="flex justify-center space-x-2 sm:space-x-4">
            <input *ngFor="let digit of otpArray; let i = index; trackBy: trackByIndex"
                   [id]="'otp_' + i"
                   type="text"
                   inputmode="numeric"
                   maxlength="1"
                   [(ngModel)]="otpArray[i]"
                   [name]="'otp_' + i"
                   (input)="onInput($event, i)"
                   (keydown)="onKeyDown($event, i)"
                   (paste)="onPaste($event)"
                   autocomplete="one-time-code"
                   class="w-10 h-14 sm:w-12 sm:h-16 text-center bg-surface-container-lowest text-on-surface text-2xl font-display font-semibold rounded-md border-2 border-outline/30 focus:border-primary focus:shadow-ambient transition-all outline-none" />
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
        <button type="submit" [disabled]="otp.length !== 6 || loading"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container hover:shadow-ambient focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <span *ngIf="loading" class="material-symbols-outlined animate-spin mr-2 text-[20px]">progress_activity</span>
          {{ loading ? 'Vérification...' : 'Valider' }}
        </button>
      </div>
      
      <div class="mt-4 text-center">
        <p class="text-xs text-on-surface-variant font-medium">
          Vous n'avez pas reçu le code ? 
          <button type="button" (click)="resendCode()" [disabled]="resendLoading || resendCooldown > 0"
                  class="text-primary hover:text-primary-container transition-colors disabled:opacity-50 font-bold ml-1">
            <span *ngIf="resendLoading" class="material-symbols-outlined animate-spin align-middle text-[14px]">progress_activity</span>
            {{ resendCooldown > 0 ? 'Renvoyer dans ' + resendCooldown + 's' : 'Renvoyer' }}
          </button>
        </p>
      </div>

    </form>
  `
})
export class VerifyOtpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  otpArray: string[] = ['', '', '', '', '', ''];
  loading = false;
  errorMessage = '';
  
  resendLoading = false;
  resendCooldown = 0;
  private cooldownInterval: any;

  constructor() {
    if (!this.authService.pendingEmailFor2FA) {
      this.router.navigate(['/auth/login']);
    }
  }

  get otp(): string {
    return this.otpArray.join('');
  }

  trackByIndex(index: number): number {
    return index;
  }

  onInput(event: any, index: number) {
    const value = event.target.value;
    
    // N'autoriser que les chiffres
    if (value && !/^\d+$/.test(value)) {
      this.otpArray[index] = '';
      event.target.value = '';
      return;
    }
    
    // Passer à la case suivante
    if (value && index < 5) {
      const nextId = 'otp_' + (index + 1);
      document.getElementById(nextId)?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otpArray[index] && index > 0) {
        // Revenir à la case précédente si la case actuelle est vide
        const prevId = 'otp_' + (index - 1);
        document.getElementById(prevId)?.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text/plain') || '';
    const numbersOnly = pastedData.replace(/\D/g, '').substring(0, 6);
    
    for (let i = 0; i < numbersOnly.length; i++) {
      this.otpArray[i] = numbersOnly[i];
    }
    
    const focusIndex = numbersOnly.length < 6 ? numbersOnly.length : 5;
    document.getElementById('otp_' + focusIndex)?.focus();
  }

  onSubmit() {
    if (this.otp.length !== 6) return;
    
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
  
  resendCode() {
    if (this.resendCooldown > 0 || this.resendLoading) return;
    
    this.resendLoading = true;
    this.errorMessage = '';
    
    this.authService.resend2Fa().subscribe({
      next: () => {
        this.resendLoading = false;
        this.startCooldown();
      },
      error: (err) => {
        this.resendLoading = false;
        this.errorMessage = err.error?.message || 'Erreur lors du renvoi du code';
      }
    });
  }

  private startCooldown() {
    this.resendCooldown = 30; // 30 seconds cooldown
    if (this.cooldownInterval) clearInterval(this.cooldownInterval);
    
    this.cooldownInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        clearInterval(this.cooldownInterval);
      }
    }, 1000);
  }

  cancel() {
    this.authService.pendingEmailFor2FA = null;
    this.router.navigate(['/auth/login']);
  }
}
