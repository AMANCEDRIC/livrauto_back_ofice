import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  AdminStats, Utilisateur, AdminPaiement, AdminVirement, 
  StatutPaiement, StatutVirement, AdminMission, AdminUserDetails, 
  AdminActionLog, AdminParametre, ApiResponse, AdminMissionDetails,
  PagedResponse
} from '../models/admin.model';

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

  getUtilisateurs(page: number = 1, size: number = 10, filter: string = 'ALL'): Observable<PagedResponse<Utilisateur>> {
    const url = `/admin/utilisateurs?page=${page}&size=${size}&filter=${filter}`;
    return this.api.get<ApiResponse<PagedResponse<Utilisateur>>>(url).pipe(
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

  // Missions
  getMissions(page: number = 1, size: number = 10, filter: string = 'ALL'): Observable<PagedResponse<AdminMission>> {
    const url = `/admin/missions?page=${page}&size=${size}&filter=${filter}`;
    return this.api.get<ApiResponse<PagedResponse<AdminMission>>>(url).pipe(
      map(res => res.data)
    );
  }

  getMissionDetails(id: number): Observable<AdminMissionDetails> {
    return this.api.get<ApiResponse<AdminMissionDetails>>(`/admin/missions/${id}`).pipe(
      map(res => res.data)
    );
  }

  // Détails Utilisateur
  getUserDetails(id: number): Observable<AdminUserDetails> {
    return this.api.get<ApiResponse<AdminUserDetails>>(`/admin/utilisateurs/${id}`).pipe(
      map(res => res.data)
    );
  }

  // Action Logs (Traces)
  getLogs(): Observable<AdminActionLog[]> {
    return this.api.get<ApiResponse<AdminActionLog[]>>('/admin/logs').pipe(
      map(res => res.data)
    );
  }

  // Paramètres
  getParametres(): Observable<AdminParametre[]> {
    return this.api.get<ApiResponse<AdminParametre[]>>('/admin/parametres').pipe(
      map(res => res.data)
    );
  }

  updateParametre(id: number, valeur: string): Observable<AdminParametre> {
    return this.api.put<ApiResponse<AdminParametre>>(`/admin/parametres/${id}`, { valeur }).pipe(
      map(res => res.data)
    );
  }
}
