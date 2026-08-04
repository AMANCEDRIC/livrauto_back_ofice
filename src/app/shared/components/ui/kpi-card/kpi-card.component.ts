import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
// Remarque : ECharts sera intégré ici pour la sparkline plus tard

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-surface-container-lowest rounded-card shadow-soft p-5 flex flex-col h-full border border-border">
      <div class="flex justify-between items-center mb-6">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" [ngClass]="iconBgClass">
          <lucide-icon [name]="icon" [size]="20" [strokeWidth]="2" [ngClass]="iconColorClass"></lucide-icon>
        </div>
        
        <!-- Trend Badge -->
        <div class="px-2 py-1 rounded-full flex items-center text-xs font-semibold" 
             [ngClass]="trend === 'up' ? 'bg-success-container text-success' : (trend === 'down' ? 'bg-error-container text-error' : 'bg-surface-container text-on-surface-variant')">
          <lucide-icon [name]="trend === 'up' ? 'trending-up' : (trend === 'down' ? 'trending-down' : 'minus')" [size]="12" [strokeWidth]="2.5" class="mr-1"></lucide-icon>
          <span>{{ variation }}</span>
        </div>
      </div>
      
      <div class="mt-auto">
        <p class="text-xs font-medium text-on-surface-variant mb-1">{{ title }}</p>
        <h3 class="text-2xl font-display font-bold text-on-surface tracking-tight">{{ value }}</h3>
      </div>
    </div>
  `
})
export class KpiCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = 'activity';
  @Input() variation = '0%';
  @Input() trend: 'up' | 'down' | 'neutral' = 'neutral';
  
  // Couleurs personnalisées pour l'icône (optionnel)
  @Input() iconBgClass = 'bg-primary-container';
  @Input() iconColorClass = 'text-primary';
}
