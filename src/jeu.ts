export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;
  private vainqueur: string | undefined;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {}

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
        this.vainqueur = this.joueur1;
      }
    } else if (joueur === this.joueur2) {
      this.pointsJoueur2++;
      if (etaitEgalite || joueur2PeutGagner) {
        this.vainqueur = this.joueur2;
      }
    }
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
}
