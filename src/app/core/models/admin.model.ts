export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PagedResponse<T> {
  items: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
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

export type StatutPaiement = 'EN_ATTENTE' | 'SUCCES' | 'ECHEC';
export type StatutVirement = 'EN_ATTENTE' | 'ENVOYE' | 'ECHEC';
export type OperateurPaiement = 'WAVE' | 'ORANGE_MONEY' | 'MTN' | 'MOOV' | 'ESPECES';
export type TypeVirement = 'MERCHANT' | 'LIVREUR' | 'PLATEFORME';

export interface AdminPaiement {
  id: number;
  commandeReference: string;
  commandeId: number;
  clientNom: string;
  clientTelephone: string;
  merchantNom: string;
  montantTotal: number;
  operateur: OperateurPaiement | null;
  statut: StatutPaiement;
  transactionId: string | null;
  referenceExterne: string | null;
  nombreTentatives: number;
  dateConfirmation: string | null;
  createdAt: string;
}

export interface AdminVirement {
  id: number;
  commandeReference: string;
  typeDestinataire: TypeVirement;
  destinataireNom: string;
  destinataireTelephone: string;
  montant: number;
  statut: StatutVirement;
  referenceExterne: string | null;
  messageErreur: string | null;
  dateVirement: string | null;
  createdAt: string;
}

export interface AdminMission {
  missionId: number;
  missionStatut: string;
  zoneMission: string;
  montantEstime: number;
  missionCreatedAt: string;
  commandeId: number;
  commandeReference: string;
  commandeStatut: string;
  merchantNom: string;
  merchantTelephone: string;
  livreurNom: string;
  livreurTelephone: string;
}

export interface AdminUserAffiliation {
  id: number;
  userId: number;
  nom: string;
  prenom: string;
  telephone: string;
  role: string;
  statutAffiliation: string;
  acceptedAt: string | null;
}

export interface AdminUserDetails {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  statut: string;
  createdAt: string;
  affiliations: AdminUserAffiliation[];
}

export interface AdminActionLog {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  details: string;
  performedByNom: string;
  performedByEmail: string;
  createdAt: string;
}

export interface AdminParametre {
  id: number;
  cle: string;
  valeur: string;
  description: string;
  updatedByNom: string;
  updatedAt: string;
}

export interface AdminCommandeResume {
  id: number;
  reference: string;
  statut: string;
  clientNom: string;
  clientTelephone: string;
  adresseLivraison: string;
  montantColis: number;
  fraisLivraison: number;
  commissionPlateforme: number;
  montantTotal: number;
  createdAt: string;
}

export interface AdminMissionDetails {
  id: number;
  reference: string;
  titre: string;
  description: string;
  statut: string;
  dateDepart: string | null;
  dateArrivee: string | null;
  createdAt: string;
  merchantId: number;
  merchantNom: string;
  merchantTelephone: string;
  livreurId: number | null;
  livreurNom: string | null;
  livreurTelephone: string | null;
  // Résumé financier
  totalCommandes: number;
  resumeColisLivres: number;
  resumeColisEchoues: number;
  resumeEspecesCollectees: number;
  resumeARemettreAuMarchand: number;
  resumeGainsLivreur: number;
  resumeGainsPlateforme: number;
  montantTotalCommandes: number;
  totalCommissionPlateforme: number;
  totalFraisLivraison: number;
  // Liste des commandes
  commandes: AdminCommandeResume[];
}
