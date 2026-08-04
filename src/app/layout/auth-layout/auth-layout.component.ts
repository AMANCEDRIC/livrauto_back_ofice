import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-surface flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 animate-fade-in-up">
      <div class="w-full max-w-[420px] bg-white rounded-2xl shadow-soft p-10 border border-border">
        
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <img src="/logo_livre_auto.png" alt="Livre Auto" class="h-20 w-auto object-contain mb-4">
          <p class="mt-1 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Admin Console</p>
        </div>

        <router-outlet></router-outlet>
      </div>
      
      <!-- Footer Links -->
      <div class="mt-8 text-center flex items-center justify-center space-x-4 text-xs font-medium text-on-surface-variant">
        <a href="#" class="hover:text-primary transition-colors">Support</a>
        <span>•</span>
        <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
        <span>•</span>
        <span>© 2026 LIVR'AUTO</span>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}
