import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { Utilisateur } from '../../core/models/admin.model';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8 flex flex-col md:flex-row md:justify-between md:items-end space-y-4 md:space-y-0">
      <div>
        <h1 class="text-2xl font-display font-bold text-on-surface tracking-tight">Gestion des Utilisateurs</h1>
        <p class="text-sm text-on-surface-variant mt-1 font-body">Valider et gérer les marchands et livreurs de la plateforme</p>
      </div>
      
      <div class="flex space-x-2 bg-surface-container-low p-1.5 rounded-md">
        <button (click)="filter = 'ALL'" [ngClass]="{'bg-surface-container-lowest text-on-surface shadow-ambient': filter === 'ALL', 'text-on-surface-variant hover:text-on-surface': filter !== 'ALL'}"
                class="px-4 py-1.5 text-xs font-semibold rounded-sm transition-all duration-300">
          Tous
        </button>
        <button (click)="filter = 'EN_ATTENTE'" [ngClass]="{'bg-surface-container-lowest text-on-surface shadow-ambient': filter === 'EN_ATTENTE', 'text-on-surface-variant hover:text-on-surface': filter !== 'EN_ATTENTE'}"
                class="px-4 py-1.5 text-xs font-semibold rounded-sm transition-all duration-300">
          En attente
        </button>
        <button (click)="filter = 'ACTIF'" [ngClass]="{'bg-surface-container-lowest text-on-surface shadow-ambient': filter === 'ACTIF', 'text-on-surface-variant hover:text-on-surface': filter !== 'ACTIF'}"
                class="px-4 py-1.5 text-xs font-semibold rounded-sm transition-all duration-300">
          Actifs
        </button>
      </div>
    </div>

    <div *ngIf="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-surface-container-high border-t-primary"></div>
    </div>

    <!-- The Clarity Grid (No borders, spacing only) -->
    <div *ngIf="!loading" class="w-full">
      <ul class="space-y-2">
        <li *ngFor="let user of filteredUsers()">
          <div class="bg-surface-container-lowest rounded-md border-l-[3px] border-transparent hover:border-primary hover:bg-primary-fixed-dim/5 transition-all duration-300">
            <div class="flex items-center px-6 py-4">
              
              <div class="flex-shrink-0 relative">
                <div class="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span class="material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                </div>
                <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface-container-lowest"
                     [ngClass]="{
                       'bg-orange-400': user.statut === 'EN_ATTENTE',
                       'bg-tertiary-container': user.statut === 'ACTIF',
                       'bg-error': user.statut === 'INACTIF'
                     }"></div>
              </div>
              
              <div class="ml-4 flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div class="col-span-2">
                  <p class="text-sm font-bold text-on-surface font-display">{{ user.prenom }} {{ user.nom }}</p>
                  <p class="text-[11px] font-medium text-on-surface-variant mt-0.5 flex items-center">
                    <span class="material-symbols-outlined text-[14px] mr-1 opacity-70">call</span>
                    {{ user.telephone }}
                  </p>
                </div>
                
                <div class="hidden md:flex flex-col space-y-2">
                  <div class="flex items-center">
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-14">Rôle</span>
                    <span class="text-xs font-semibold text-on-surface">
                      {{ user.role === 'MERCHANT' ? 'Marchand' : 'Livreur' }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-14">Statut</span>
                    <span [ngClass]="{
                            'bg-orange-50 text-orange-700': user.statut === 'EN_ATTENTE',
                            'bg-tertiary-container text-on-tertiary-container': user.statut === 'ACTIF',
                            'bg-error-container text-error': user.statut === 'INACTIF'
                          }" class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
                      {{ user.statut | titlecase }}
                    </span>
                  </div>
                </div>

                <div class="flex justify-end space-x-3">
                  <button *ngIf="user.statut === 'ACTIF' || user.statut === 'EN_ATTENTE'" 
                          (click)="changeStatus(user.id, 'INACTIF')"
                          class="inline-flex items-center justify-center px-3 py-1.5 text-primary text-xs font-bold rounded-md hover:bg-surface-container-high transition-colors">
                    Suspendre
                  </button>
                  <button *ngIf="user.statut === 'EN_ATTENTE' || user.statut === 'INACTIF'" 
                          (click)="changeStatus(user.id, 'ACTIF')"
                          class="inline-flex items-center justify-center px-4 py-1.5 bg-gradient-to-br from-primary to-primary-container text-on-primary text-xs font-bold rounded-md hover:shadow-ambient transition-all">
                    Approuver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li *ngIf="filteredUsers().length === 0" class="px-8 py-16 text-center bg-surface-container-lowest rounded-xl">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-low mb-6">
            <span class="material-symbols-outlined text-on-surface-variant text-4xl">search_off</span>
          </div>
          <p class="text-on-surface-variant font-medium text-lg">Aucun utilisateur trouvé.</p>
        </li>
      </ul>
    </div>
  `
})
export class UtilisateursComponent implements OnInit {
  private adminService = inject(AdminService);
  users: Utilisateur[] = [];
  loading = true;
  filter: 'ALL' | 'EN_ATTENTE' | 'ACTIF' = 'ALL';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getUtilisateurs().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur utilisateurs", err);
        this.loading = false;
      }
    });
  }

  filteredUsers() {
    if (this.filter === 'ALL') return this.users;
    return this.users.filter(u => u.statut === this.filter);
  }

  changeStatus(id: number, statut: string) {
    if (confirm(`Êtes-vous sûr de vouloir passer cet utilisateur en ${statut} ?`)) {
      this.adminService.updateUserStatus(id, statut).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          alert('Erreur lors du changement de statut');
          console.error(err);
        }
      });
    }
  }
}
