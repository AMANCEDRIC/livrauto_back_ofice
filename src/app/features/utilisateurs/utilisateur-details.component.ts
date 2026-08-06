import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminUserDetails } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-utilisateur-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './utilisateur-details.component.html'
})
export class UtilisateurDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  user = signal<AdminUserDetails | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        this.loadUser(parseInt(idStr, 10));
      } else {
        this.router.navigate(['/admin/utilisateurs']);
      }
    });
  }

  loadUser(id: number) {
    this.loading.set(true);
    this.adminService.getUserDetails(id).subscribe({
      next: (data) => {
        this.user.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur', 'Erreur lors du chargement de l\'utilisateur');
        this.loading.set(false);
        this.router.navigate(['/admin/utilisateurs']);
      }
    });
  }
}
