import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminMission } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './missions.component.html'
})
export class MissionsComponent implements OnInit {
  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  missions = signal<AdminMission[]>([]);
  loading = signal(true);
  
  viewMode = signal<'list' | 'card'>('list');
  filter = signal<string>('ALL');

  // Rendre Math disponible dans le template HTML
  Math = Math;

  // Pagination states from API
  pageIndex = signal<number>(1);
  pageSize = signal<number>(10);
  pageSizes = [5, 10, 20, 50];
  totalElements = signal<number>(0);
  totalPages = signal<number>(1);

  setFilter(status: string) {
    this.filter.set(status);
    this.pageIndex.set(1);
    this.loadMissions();
  }

  // Pagination methods
  nextPage() {
    if (this.pageIndex() < this.totalPages()) {
      this.pageIndex.update(v => v + 1);
      this.loadMissions();
    }
  }

  prevPage() {
    if (this.pageIndex() > 1) {
      this.pageIndex.update(v => v - 1);
      this.loadMissions();
    }
  }

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.pageSize.set(Number(select.value));
    this.pageIndex.set(1);
    this.loadMissions();
  }

  ngOnInit() {
    this.loadMissions();
  }

  loadMissions() {
    this.loading.set(true);
    this.adminService.getMissions(this.pageIndex(), this.pageSize(), this.filter()).subscribe({
      next: (data) => {
        this.missions.set(data.items);
        this.totalElements.set(data.totalElements);
        this.totalPages.set(data.totalPages);
        // Ensure page index is not out of bounds if data shrinks
        if (data.currentPage !== this.pageIndex()) {
          this.pageIndex.set(data.currentPage);
        }
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur', 'Erreur lors du chargement des missions');
        this.loading.set(false);
      }
    });
  }
}
