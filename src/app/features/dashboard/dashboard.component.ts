import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AdminStats } from '../../core/models/admin.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8">
      <h1 class="text-2xl font-display font-bold text-on-surface tracking-tight">Vue d'ensemble</h1>
      <p class="text-sm text-on-surface-variant mt-1 font-body">L'activité de votre plateforme Livrauto en temps réel</p>
    </div>

    <div *ngIf="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-surface-container-high border-t-primary"></div>
    </div>

    <div *ngIf="!loading && stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- KPI 1 -->
      <div class="bg-surface-container-lowest rounded-lg p-6 hover:shadow-ambient transition-all duration-300">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Commandes Totales</p>
            <p class="text-3xl font-display font-bold text-on-surface mt-2">{{ stats.totalCommandes }}</p>
          </div>
          <div class="p-2.5 rounded-md bg-secondary-container text-on-secondary-container">
            <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
          </div>
        </div>
        <div class="mt-6 flex items-center text-xs font-semibold text-on-surface-variant">
          <span class="material-symbols-outlined text-[16px] mr-1 text-on-secondary-container">trending_up</span>
          +12% depuis la semaine dernière
        </div>
      </div>

      <!-- KPI 2 -->
      <div class="bg-surface-container-lowest rounded-lg p-6 hover:shadow-ambient transition-all duration-300">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Missions Livrées</p>
            <p class="text-3xl font-display font-bold text-on-surface mt-2">{{ stats.totalMissions }}</p>
          </div>
          <div class="p-2.5 rounded-md bg-tertiary-container text-on-tertiary-container">
            <span class="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
        </div>
        <div class="mt-6 flex items-center text-xs font-semibold text-on-surface-variant">
          <span class="material-symbols-outlined text-[16px] mr-1 text-on-tertiary-container">trending_up</span>
          +5% depuis la semaine dernière
        </div>
      </div>

      <!-- KPI 3 -->
      <div class="bg-surface-container-lowest rounded-lg p-6 hover:shadow-ambient transition-all duration-300">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Commissions</p>
            <p class="text-2xl font-display font-bold text-on-surface mt-2">{{ stats.totalRevenue | currency:'XOF':'symbol':'1.0-0':'fr-FR' }}</p>
          </div>
          <div class="p-2.5 rounded-md bg-primary-container text-on-primary">
            <span class="material-symbols-outlined text-[22px]">payments</span>
          </div>
        </div>
        <div class="mt-6 flex items-center text-xs font-semibold text-on-surface-variant">
          <span class="material-symbols-outlined text-[16px] mr-1 text-primary">trending_up</span>
          +18% ce mois
        </div>
      </div>

      <!-- KPI 4 -->
      <div class="bg-surface-container-lowest rounded-lg p-6 hover:shadow-ambient transition-all duration-300">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Communauté</p>
            <p class="text-3xl font-display font-bold text-on-surface mt-2">{{ stats.totalMarchands + stats.totalLivreurs }}</p>
          </div>
          <div class="p-2.5 rounded-md bg-surface-container-high text-on-surface">
            <span class="material-symbols-outlined text-[22px]">group</span>
          </div>
        </div>
        <div class="mt-6 text-xs font-semibold text-on-surface-variant flex space-x-4">
          <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-on-surface-variant opacity-70 mr-1.5"></span>{{ stats.totalMarchands }} Marchands</span>
          <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-on-surface-variant opacity-40 mr-1.5"></span>{{ stats.totalLivreurs }} Livreurs</span>
        </div>
      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit {
  private adminService = inject(AdminService);
  stats: AdminStats | null = null;
  loading = true;

  ngOnInit() {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur de récupération des stats", err);
        this.loading = false;
      }
    });
  }
}
