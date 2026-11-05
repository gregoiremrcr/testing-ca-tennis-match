export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {}

  pointPour(joueur: string): void {
    if (joueur === this.joueur1) {
      this.pointsJoueur1++;
    } else if (joueur === this.joueur2) {
      this.pointsJoueur2++;
    }
  }

  score(): string {
    const annonces = ["Zéro", "Quinze", "Trente", "Quarante"];
    const pointsAnnonceJoueur1 = Math.min(this.pointsJoueur1, 3);
    const pointsAnnonceJoueur2 = Math.min(this.pointsJoueur2, 3);

    if (pointsAnnonceJoueur1 === 1 && pointsAnnonceJoueur2 === 1) {
      return "Quinze-A";
    }

    if (pointsAnnonceJoueur1 === 2 && pointsAnnonceJoueur2 === 2) {
      return "Trente-A";
    }

    return `${annonces[pointsAnnonceJoueur1]}-${annonces[pointsAnnonceJoueur2]}`;
  }
}
