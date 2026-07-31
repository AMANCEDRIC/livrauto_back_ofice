import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <img src="/logo_padded.png" alt="Livrauto Logo" class="h-16 w-auto">
        <h2 class="mt-4 text-center text-3xl font-display font-bold text-on-surface tracking-tight">
          Espace Administrateur
        </h2>
        <p class="mt-2 text-center text-sm text-on-surface-variant font-body">Portail sécurisé Livrauto</p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-surface-container-lowest py-8 px-6 shadow-ambient rounded-xl sm:px-10">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}
