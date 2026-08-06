import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AdminMission } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './missions.component.html'
})
export class MissionsComponent implements OnInit {
  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  missions = signal<AdminMission[]>([]);
  loading = signal(true);
  
  viewMode = signal<'list' | 'card'>('list');
  filter = signal<string>('ALL');

  filteredMissions = computed(() => {
    const currentFilter = this.filter();
    const allMissions = this.missions();
    if (currentFilter === 'ALL') return allMissions;
    return allMissions.filter(m => m.missionStatut === currentFilter);
  });

  setFilter(newFilter: string) {
    this.filter.set(newFilter);
  }

  ngOnInit() {
    this.loadMissions();
  }

  loadMissions() {
    this.loading.set(true);
    this.adminService.getMissions().subscribe({
      next: (data) => {
        this.missions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur', 'Erreur lors du chargement des missions');
        this.loading.set(false);
      }
    });
  }
}
