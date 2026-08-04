import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AdminPaiement, AdminVirement, StatutPaiement, StatutVirement } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { LucideAngularModule } from 'lucide-angular';
import { StatusBadgeComponent, BadgeStatus } from '../../shared/components/ui/status-badge/status-badge.component';

type TabActive = 'paiements' | 'virements';
type FilterPaiement = 'ALL' | StatutPaiement;
type FilterVirement = 'ALL' | StatutVirement;

@Component({
  selector: 'app-paiements',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './paiements.component.html'
})
export class PaiementsComponent implements OnInit {
  private adminService = inject(AdminService);
  private toastService = inject(ToastService);
  private confirmService = inject(ConfirmDialogService);

  // Onglet actif
  activeTab = signal<TabActive>('paiements');

  // ── Paiements ───────────────────────────────────────────────────────────────
  paiements = signal<AdminPaiement[]>([]);
  loadingPaiements = signal(true);
  filterPaiement = signal<FilterPaiement>('ALL');
  relancingPaiementId = signal<number | null>(null);

  filteredPaiements = computed(() => {
    const f = this.filterPaiement();
    const list = this.paiements();
    return f === 'ALL' ? list : list.filter(p => p.statut === f);
  });

  // ── Virements ───────────────────────────────────────────────────────────────
  virements = signal<AdminVirement[]>([]);
  loadingVirements = signal(true);
  filterVirement = signal<FilterVirement>('ALL');
  relancingVirementId = signal<number | null>(null);

  filteredVirements = computed(() => {
    const f = this.filterVirement();
    const list = this.virements();
    return f === 'ALL' ? list : list.filter(v => v.statut === f);
  });

  ngOnInit() {
    this.loadPaiements();
    this.loadVirements();
  }

  // ── Loaders ─────────────────────────────────────────────────────────────────
  loadPaiements() {
    this.loadingPaiements.set(true);
    this.adminService.getPaiements().subscribe({
      next: (data) => { this.paiements.set(data); this.loadingPaiements.set(false); },
      error: () => { this.toastService.error('Erreur', 'Impossible de charger les paiements.'); this.loadingPaiements.set(false); }
    });
  }

  loadVirements() {
    this.loadingVirements.set(true);
    this.adminService.getVirements().subscribe({
      next: (data) => { this.virements.set(data); this.loadingVirements.set(false); },
      error: () => { this.toastService.error('Erreur', 'Impossible de charger les virements.'); this.loadingVirements.set(false); }
    });
  }

  // ── Filtres ─────────────────────────────────────────────────────────────────
  setFilterPaiement(f: FilterPaiement) { this.filterPaiement.set(f); }
  setFilterVirement(f: FilterVirement) { this.filterVirement.set(f); }

  // ── Relances ────────────────────────────────────────────────────────────────
  async relancerPaiement(p: AdminPaiement) {
    const confirmed = await this.confirmService.confirm({
      title: 'Relancer le paiement',
      message: `Relancer la vérification du paiement pour la commande ${p.commandeReference} ?`,
      type: 'info',
      confirmText: 'Relancer',
      cancelText: 'Annuler'
    });
    if (!confirmed) return;

    this.relancingPaiementId.set(p.id);
    this.adminService.relancerPaiement(p.id).subscribe({
      next: (updated) => {
        this.paiements.update(list => list.map(item => item.id === p.id ? updated : item));
        this.toastService.success('Relancé', `Le paiement ${p.commandeReference} a été traité.`);
        this.relancingPaiementId.set(null);
      },
      error: (err) => {
        this.toastService.error('Erreur', err.error?.message || 'La relance a échoué.');
        this.relancingPaiementId.set(null);
      }
    });
  }

  async relancerVirement(v: AdminVirement) {
    const confirmed = await this.confirmService.confirm({
      title: 'Relancer le virement',
      message: `Retenter le payout Mobile Money de ${v.montant} XOF vers ${v.destinataireNom} ?`,
      type: 'info',
      confirmText: 'Relancer',
      cancelText: 'Annuler'
    });
    if (!confirmed) return;

    this.relancingVirementId.set(v.id);
    this.adminService.relancerVirement(v.id).subscribe({
      next: (updated) => {
        this.virements.update(list => list.map(item => item.id === v.id ? updated : item));
        this.toastService.success('Relancé', `Le virement vers ${v.destinataireNom} a été relancé.`);
        this.relancingVirementId.set(null);
      },
      error: (err) => {
        this.toastService.error('Erreur', err.error?.message || 'La relance a échoué.');
        this.relancingVirementId.set(null);
      }
    });
  }

  // ── Helpers UI ──────────────────────────────────────────────────────────────
  trackById(index: number, item: { id: number }) { return item.id; }

  statutPaiementClass(statut: StatutPaiement): BadgeStatus {
    switch (statut) {
      case 'SUCCES':    return 'success';
      case 'ECHEC':     return 'error';
      case 'EN_ATTENTE': return 'warning';
      default:          return 'default';
    }
  }

  statutVirementClass(statut: StatutVirement): BadgeStatus {
    switch (statut) {
      case 'ENVOYE':    return 'success';
      case 'ECHEC':     return 'error';
      case 'EN_ATTENTE': return 'warning';
      default:          return 'default';
    }
  }

  operateurLabel(op: string | null): string {
    const map: Record<string, string> = {
      WAVE: 'Wave', ORANGE_MONEY: 'Orange Money', MTN: 'MTN MoMo',
      MOOV: 'Moov Money', ESPECES: 'Espèces'
    };
    return op ? (map[op] || op) : '—';
  }

  typeVirementLabel(type: string): string {
    const map: Record<string, string> = {
      MERCHANT: 'Marchand', LIVREUR: 'Livreur', PLATEFORME: 'Plateforme'
    };
    return map[type] || type;
  }
}
