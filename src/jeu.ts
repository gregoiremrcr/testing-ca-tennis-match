import type { Classement } from "./classement";

export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;
  private jeuxGagnesJoueur1 = 0;
  private jeuxGagnesJoueur2 = 0;
  private vainqueur: string | undefined;
  private readonly format: "jeu" | "set";

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement = { enregistrer: () => {} },
    options: { format: "set" } | undefined = undefined,
  ) {
    this.format = options?.format ?? "jeu";
  }

  pointPour(joueur: string): void {
    if (this.vainqueur !== undefined) {
      return;
    }

    const etaitEgalite =
      this.pointsJoueur1 >= 3 && this.pointsJoueur1 === this.pointsJoueur2;
    const joueur1PeutGagner =
      this.pointsJoueur1 === 3 && this.pointsJoueur2 < 3;
    const joueur2PeutGagner =
      this.pointsJoueur2 === 3 && this.pointsJoueur1 < 3;

    if (joueur === this.joueur1) {
      this.pointsJoueur1++;
      if (etaitEgalite || joueur1PeutGagner) {
        this.terminerLeJeu(this.joueur1, this.joueur2);
      }
    } else if (joueur === this.joueur2) {
      this.pointsJoueur2++;
      if (etaitEgalite || joueur2PeutGagner) {
        this.terminerLeJeu(this.joueur2, this.joueur1);
      }
    }
  }

  jeuxGagnes(joueur: string): number {
    if (joueur === this.joueur1) {
      return this.jeuxGagnesJoueur1;
    }

    if (joueur === this.joueur2) {
      return this.jeuxGagnesJoueur2;
    }

    return 0;
  }

  score(): string {
    if (this.vainqueur !== undefined) {
      return `Victoire ${this.vainqueur}`;
    }

    const annonces = ["Zéro", "Quinze", "Trente", "Quarante"];
    const pointsAnnonceJoueur1 = Math.min(this.pointsJoueur1, 3);
    const pointsAnnonceJoueur2 = Math.min(this.pointsJoueur2, 3);

    if (
      this.pointsJoueur1 >= 3 &&
      this.pointsJoueur1 === this.pointsJoueur2
    ) {
      return "Égalité";
    }

    if (pointsAnnonceJoueur1 === 1 && pointsAnnonceJoueur2 === 1) {
      return "Quinze-A";
    }

    if (pointsAnnonceJoueur1 === 2 && pointsAnnonceJoueur2 === 2) {
      return "Trente-A";
    }

    return `${annonces[pointsAnnonceJoueur1]}-${annonces[pointsAnnonceJoueur2]}`;
  }

  private terminerLeJeu(vainqueur: string, perdant: string): void {
    if (this.format === "set") {
      if (vainqueur === this.joueur1) {
        this.jeuxGagnesJoueur1++;
      } else {
        this.jeuxGagnesJoueur2++;
      }

      this.pointsJoueur1 = 0;
      this.pointsJoueur2 = 0;
      return;
    }

    this.vainqueur = vainqueur;
    this.classement.enregistrer(vainqueur, perdant);
  }
}
