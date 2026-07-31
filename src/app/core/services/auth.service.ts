import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public pendingEmailFor2FA: string | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }

  login(email: string, motDePasse: string): Observable<any> {
    return this.api.post('/auth/login', { email, motDePasse }).pipe(
      tap((res: any) => {
        // Le backend renvoie 202 ACCEPTED si 2FA est requis, mais axios/http l'interprète souvent
        // comme un succès. On vérifie le corps de la réponse.
        if (res.data?.requires2FA) {
          this.pendingEmailFor2FA = email;
        } else if (res.data?.token) {
          this.handleAuthSuccess(res.data);
        }
      })
    );
  }

  verify2Fa(otp: string): Observable<any> {
    if (!this.pendingEmailFor2FA) {
      throw new Error("Aucun email en attente pour le 2FA");
    }
    return this.api.post('/auth/verify-2fa', { email: this.pendingEmailFor2FA, otp }).pipe(
      tap((res: any) => {
        if (res.data?.token) {
          this.handleAuthSuccess(res.data);
          this.pendingEmailFor2FA = null;
        }
      })
    );
  }

  private handleAuthSuccess(userData: any) {
    localStorage.setItem('token', userData.token);
    // On retire le token de l'objet utilisateur stocké
    const user = { ...userData };
    delete user.token;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
