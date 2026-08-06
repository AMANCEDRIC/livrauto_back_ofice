import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AdminActionLog } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  logs = signal<AdminActionLog[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.loading.set(true);
    this.adminService.getLogs().subscribe({
      next: (data) => {
        this.logs.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur', 'Erreur lors du chargement des logs');
        this.loading.set(false);
      }
    });
  }
}
