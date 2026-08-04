import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminStats, Utilisateur, AdminPaiement, AdminVirement, StatutPaiement, StatutVirement, ApiResponse } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = inject(ApiService);

  getStats(): Observable<AdminStats> {
    return this.api.get<ApiResponse<AdminStats>>('/admin/stats').pipe(
      map(res => res.data)
    );
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.api.get<ApiResponse<Utilisateur[]>>('/admin/utilisateurs').pipe(
      map(res => res.data)
    );
  }

  updateUserStatus(id: number, statut: string): Observable<Utilisateur> {
    return this.api.put<ApiResponse<Utilisateur>>(`/admin/utilisateurs/${id}/statut`, { statut }).pipe(
      map(res => res.data)
    );
  }

  // ── Paiements ──────────────────────────────────────────────────────────────

  getPaiements(statut?: StatutPaiement): Observable<AdminPaiement[]> {
    const url = statut ? `/admin/paiements?statut=${statut}` : '/admin/paiements';
    return this.api.get<ApiResponse<AdminPaiement[]>>(url).pipe(
      map(res => res.data)
    );
  }

  relancerPaiement(id: number): Observable<AdminPaiement> {
    return this.api.post<ApiResponse<AdminPaiement>>(`/admin/paiements/${id}/relancer`, {}).pipe(
      map(res => res.data)
    );
  }

  // ── Virements ──────────────────────────────────────────────────────────────

  getVirements(statut?: StatutVirement): Observable<AdminVirement[]> {
    const url = statut ? `/admin/virements?statut=${statut}` : '/admin/virements';
    return this.api.get<ApiResponse<AdminVirement[]>>(url).pipe(
      map(res => res.data)
    );
  }

  relancerVirement(id: number): Observable<AdminVirement> {
    return this.api.post<ApiResponse<AdminVirement>>(`/admin/virements/${id}/relancer`, {}).pipe(
      map(res => res.data)
    );
  }
}
