import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { Utilisateur } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

type UserStatus = 'EN_ATTENTE' | 'ACTIF' | 'INACTIF' | 'ALL';

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
  filter = signal<UserStatus>('ALL');

  Math = Math;

  // Pagination states
  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  pageSizes = [5, 10, 20, 50];
  totalElements = signal<number>(0);
  totalPages = signal<number>(1);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.adminService.getUtilisateurs(this.pageIndex(), this.pageSize(), this.filter()).subscribe({
      next: (data) => {
        this.users.set(data.items);
        this.totalElements.set(data.totalElements);
        this.totalPages.set(data.totalPages);
        if (data.currentPage !== this.pageIndex()) {
          this.pageIndex.set(data.currentPage);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Erreur utilisateurs", err);
        this.toastService.error("Erreur", "Impossible de charger les utilisateurs.");
        this.loading.set(false);
      }
    });
  }

  setFilter(newFilter: UserStatus) {
    this.filter.set(newFilter);
    this.pageIndex.set(1);
    this.loadUsers();
  }

  // Pagination methods
  nextPage() {
    if (this.pageIndex() < this.totalPages()) {
      this.pageIndex.update(v => v + 1);
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.pageIndex() > 1) {
      this.pageIndex.update(v => v - 1);
      this.loadUsers();
    }
  }

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.pageSize.set(Number(select.value));
    this.pageIndex.set(1);
    this.loadUsers();
  }

  trackById(index: number, user: Utilisateur): number {
    return user.id;
  }

  async changeStatus(id: number, statut: 'ACTIF' | 'INACTIF' | 'EN_ATTENTE' | 'BLOQUE') {
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
          // Update local status without reloading the page
          this.users.update(currentUsers => 
            currentUsers.map(user => 
              user.id === id ? { ...user, statut: statut as any } : user
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
