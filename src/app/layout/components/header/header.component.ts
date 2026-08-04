import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  private authService = inject(AuthService);
  user$ = this.authService.currentUser$;
}
