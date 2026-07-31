export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface AdminStats {
  totalMarchands: number;
  totalLivreurs: number;
  totalCommandes: number;
  totalMissions: number;
  totalRevenue: number;
}

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'ADMIN' | 'MERCHANT' | 'LIVREUR';
  statut: 'ACTIF' | 'EN_ATTENTE' | 'INACTIF' | 'BLOQUE';
}
