import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminStats, Utilisateur, ApiResponse } from '../models/admin.model';

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
}
