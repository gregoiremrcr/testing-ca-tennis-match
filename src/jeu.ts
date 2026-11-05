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
    const annonces = ["Zéro", "Quinze"];

    return `${annonces[this.pointsJoueur1] ?? ""}-${annonces[this.pointsJoueur2] ?? ""}`;
  }
}
