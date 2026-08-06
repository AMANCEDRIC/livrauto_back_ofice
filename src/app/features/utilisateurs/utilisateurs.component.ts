import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { Utilisateur } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

type UserStatus = 'EN_ATTENTE' | 'ACTIF' | 'INACTIF';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './utilisateurs.component.html'
})
export class UtilisateursComponent implements OnInit {
  private adminService = inject(AdminService);
  private toastService = inject(ToastService);
  private confirmService = inject(ConfirmDialogService);

  users = signal<Utilisateur[]>([]);
  loading = signal<boolean>(true);
  filter = signal<'ALL' | UserStatus>('ALL');

  filteredUsers = computed(() => {
    const currentFilter = this.filter();
    const currentUsers = this.users();
    if (currentFilter === 'ALL') return currentUsers;
    return currentUsers.filter(u => u.statut === currentFilter);
  });

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.adminService.getUtilisateurs().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Erreur utilisateurs", err);
        this.toastService.error("Erreur", "Impossible de charger les utilisateurs.");
        this.loading.set(false);
      }
    });
  }

  setFilter(newFilter: 'ALL' | UserStatus) {
    this.filter.set(newFilter);
  }

  trackById(index: number, user: Utilisateur): number {
    return user.id;
  }

  async changeStatus(id: number, statut: UserStatus) {
    const action = statut === 'ACTIF' ? 'approuver' : 'suspendre';
    const confirmed = await this.confirmService.confirm({
      title: 'Confirmation',
      message: `Êtes-vous sûr de vouloir ${action} cet utilisateur ?`,
      type: statut === 'ACTIF' ? 'info' : 'warning',
      confirmText: 'Oui',
      cancelText: 'Non'
    });

    if (confirmed) {
      this.adminService.updateUserStatus(id, statut).subscribe({
        next: () => {
          // Mise à jour optimiste (sans recharger toute la liste)
          this.users.update(currentUsers => 
            currentUsers.map(user => 
              user.id === id ? { ...user, statut } : user
            )
          );
          this.toastService.success("Succès", `Le statut a été mis à jour.`);
        },
        error: (err) => {
          this.toastService.error("Erreur", "Une erreur est survenue lors de la mise à jour.");
          console.error(err);
        }
      });
    }
  }
}
