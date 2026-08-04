import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, LucideAngularModule],
  template: `
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-6">
      
      <div class="space-y-5">
        <app-input
          id="email"
          label="Adresse Email"
          type="email"
          [(ngModel)]="email"
          name="email"
          placeholder="admin@livreauto.com"
          icon="mail"
          [required]="true"
        ></app-input>

        <app-input
          id="password"
          label="Mot de passe"
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="••••••••"
          icon="lock"
          [required]="true"
        ></app-input>
      </div>

      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-border text-primary focus:ring-primary-container">
          <label for="remember-me" class="ml-2 block text-sm text-on-surface-variant font-medium">Se souvenir de moi</label>
        </div>
        <div class="text-sm">
          <a href="#" class="font-semibold text-primary hover:text-primary-container transition-colors">Mot de passe oublié ?</a>
        </div>
      </div>

      <div *ngIf="errorMessage" class="bg-error-container border border-error/50 p-4 rounded-lg flex items-start mt-4">
        <lucide-icon name="alert-circle" [size]="20" class="text-error mr-3 shrink-0 mt-0.5"></lucide-icon>
        <p class="text-sm text-error font-medium">{{ errorMessage }}</p>
      </div>

      <div class="pt-4">
        <app-button
          type="submit"
          variant="primary"
          [block]="true"
          [disabled]="!!loginForm.invalid"
          [loading]="loading"
        >
          Se connecter
        </app-button>
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
