import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminMissionDetails } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mission-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './mission-details.component.html'
})
export class MissionDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  mission = signal<AdminMissionDetails | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/admin/missions']);
      return;
    }
    this.adminService.getMissionDetails(id).subscribe({
      next: (data) => {
        this.mission.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Erreur', 'Impossible de charger les détails de la mission.');
        this.loading.set(false);
      }
    });
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      'CREEE': 'bg-blue-100 text-blue-700',
      'EN_COURS': 'bg-amber-100 text-amber-700',
      'TERMINEE': 'bg-emerald-100 text-emerald-700',
      'ANNULEE': 'bg-red-100 text-red-700',
      'EN_ATTENTE': 'bg-purple-100 text-purple-700',
    };
    return map[statut] ?? 'bg-slate-100 text-slate-600';
  }

  getCommandeStatutClass(statut: string): string {
    const map: Record<string, string> = {
      'CREEE': 'bg-slate-100 text-slate-600',
      'EN_ATTENTE_PAIEMENT': 'bg-yellow-100 text-yellow-700',
      'PAYEE': 'bg-blue-100 text-blue-700',
      'EN_COURS_LIVRAISON': 'bg-amber-100 text-amber-700',
      'LIVREE': 'bg-emerald-100 text-emerald-700',
      'ECHEC': 'bg-red-100 text-red-700',
      'ANNULEE': 'bg-red-100 text-red-700',
    };
    return map[statut] ?? 'bg-slate-100 text-slate-600';
  }
}
