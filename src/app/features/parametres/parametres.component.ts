import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AdminParametre } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './parametres.component.html'
})
export class ParametresComponent implements OnInit {
  private adminService = inject(AdminService);
  private toast = inject(ToastService);

  parametres = signal<AdminParametre[]>([]);
  loading = signal(true);
  
  editingParam: number | null = null;
  editValue: string = '';

  ngOnInit() {
    this.loadParametres();
  }

  loadParametres() {
    this.loading.set(true);
    this.adminService.getParametres().subscribe({
      next: (data) => {
        this.parametres.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('Erreur', 'Erreur lors du chargement des paramètres');
        this.loading.set(false);
      }
    });
  }

  startEdit(param: AdminParametre) {
    this.editingParam = param.id;
    this.editValue = param.valeur;
  }

  cancelEdit() {
    this.editingParam = null;
  }

  saveEdit(param: AdminParametre) {
    if (!this.editValue || this.editValue.trim() === '') {
      this.toast.info('Attention', 'La valeur ne peut pas être vide');
      return;
    }

    this.adminService.updateParametre(param.id, this.editValue).subscribe({
      next: (updated) => {
        this.parametres.update(list => list.map(p => p.id === updated.id ? updated : p));
        this.toast.success('Succès', 'Paramètre mis à jour');
        this.editingParam = null;
      },
      error: () => {
        this.toast.error('Erreur', 'Erreur lors de la mise à jour');
      }
    });
  }
}
