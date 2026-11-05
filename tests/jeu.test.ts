import { describe, expect, it, vi } from "vitest";
import type { Classement } from "../src/classement";
import { Jeu } from "../src/jeu";

describe("score initial", () => {
  it("renvoie zéro-zéro lorsque personne n'a marqué de point", () => {
    const jeu = new Jeu("Alice", "Bob");

    expect(jeu.score()).toBe("Zéro-Zéro");
  });
});

describe("premier point marqué", () => {
  it("affiche quinze-zéro quand Alice marque un point", () => {
    const jeu = new Jeu("Alice", "Bob");

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });
});

describe("progression des points", () => {
  it("affiche trente-quinze quand Alice a deux points et Bob un point", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Trente-Quinze");
  });

  it("affiche quarante-trente quand Alice a trois points et Bob deux points", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Quarante-Trente");
  });

  it("affiche quinze-A quand Alice et Bob ont chacun un point", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Quinze-A");
  });

  it("affiche trente-A quand Alice et Bob ont chacun deux points", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Trente-A");
  });
});

describe("égalité à quarante-quarante", () => {
  it("affiche égalité quand Alice et Bob ont chacun trois points", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Égalité");
  });
});

describe("point décisif sans avantage", () => {
  it("donne la victoire à Alice si elle marque après égalité", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("donne la victoire à Bob s'il marque après égalité", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Bob");
  });
});

describe("victoire à quarante", () => {
  it("donne la victoire à Alice si elle marque avec quarante contre quinze", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("donne la victoire à Bob s'il marque avec quarante contre quinze", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");

    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Bob");
  });
});

describe("résultat après la victoire", () => {
  it("conserve la victoire d'Alice après un point supplémentaire", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Victoire Alice");

    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("conserve la victoire de Bob après un point supplémentaire", () => {
    const jeu = new Jeu("Alice", "Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Bob");

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Victoire Bob");
  });
});

function creerJeuAvecClassement() {
  const enregistrer = vi.fn();
  const classement: Classement = { enregistrer };
  const jeu = new Jeu("Alice", "Bob", classement);

  return { jeu, enregistrer };
}

describe("enregistrement du résultat au classement", () => {
  // Spy avec vi.fn : il mémorise les appels et leurs arguments.
  // Il convient mieux qu'un fake ou un stub, car le test observe cet appel externe.
  it("enregistre Alice comme vainqueur et Bob comme perdant", () => {
    const { jeu, enregistrer } = creerJeuAvecClassement();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");

    expect(enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  // Spy avec vi.fn : il permet de vérifier qu'aucun appel n'a eu lieu.
  // Il est préférable à un dummy, qui ne fournirait pas cette observation.
  it("n'enregistre aucun résultat tant que le match n'est pas terminé", () => {
    const { jeu, enregistrer } = creerJeuAvecClassement();
    jeu.pointPour("Alice");

    expect(enregistrer).not.toHaveBeenCalled();
  });

  // Spy avec vi.fn : il compte précisément les appels au classement.
  // Il est plus adapté qu'un stub, qui ne mémoriserait pas leur nombre.
  it("enregistre le résultat une seule fois à la victoire", () => {
    const { jeu, enregistrer } = creerJeuAvecClassement();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");

    expect(enregistrer).toHaveBeenCalledTimes(1);
  });

  // Spy avec vi.fn : il vérifie qu'un point ultérieur ne déclenche pas de nouvel appel.
  // Il est préférable à un fake ici, car seul le nombre d'appels importe.
  it("ne réenregistre pas le résultat après un point supplémentaire", () => {
    const { jeu, enregistrer } = creerJeuAvecClassement();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(enregistrer).toHaveBeenCalledTimes(1);
  });
});

type JeuEnUnSet = Jeu & {
  jeuxGagnes(joueur: string): number;
};

const CreerJeuEnUnSet = Jeu as unknown as new (
  joueur1: string,
  joueur2: string,
  classement: Classement,
  options: { format: "set" },
) => JeuEnUnSet;

function creerJeuEnUnSet(): JeuEnUnSet {
  const classement: Classement = { enregistrer: vi.fn() };
  return new CreerJeuEnUnSet("Alice", "Bob", classement, { format: "set" });
}

describe("comptage des jeux gagnés dans un set", () => {
  // Spy avec vi.fn : il fournit un classement sans service réel.
  // Il est adapté ici car le test porte sur les compteurs, pas sur le classement.
  it("commence avec zéro jeu gagné pour Alice et Bob", () => {
    const jeu = creerJeuEnUnSet();

    expect(jeu.jeuxGagnes("Alice")).toBe(0);
    expect(jeu.jeuxGagnes("Bob")).toBe(0);
  });

  // Spy avec vi.fn : il remplace le service externe sans l'appeler réellement.
  // Il convient car seule la victoire du jeu et son compteur sont observés ici.
  it("augmente les jeux gagnés d'Alice après sa victoire dans un jeu", () => {
    const jeu = creerJeuEnUnSet();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");

    expect(jeu.jeuxGagnes("Alice")).toBe(1);
  });

  // Spy avec vi.fn : il empêche tout appel à un classement externe pendant le test.
  // Il est préférable à un service réel puisque l'on teste le compteur de Bob.
  it("augmente les jeux gagnés de Bob après sa victoire dans un jeu", () => {
    const jeu = creerJeuEnUnSet();
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    expect(jeu.jeuxGagnes("Bob")).toBe(1);
  });

  // Spy avec vi.fn : il isole le comptage du service externe.
  // Il est préférable à un fake complet car aucune logique du classement n'est testée.
  it("garde les jeux gagnés séparés du score du jeu en cours", () => {
    const jeu = creerJeuEnUnSet();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");

    jeu.pointPour("Bob");
    jeu.pointPour("Bob");

    expect(jeu.jeuxGagnes("Alice")).toBe(1);
    expect(jeu.jeuxGagnes("Bob")).toBe(0);
    expect(jeu.score()).toBe("Zéro-Trente");
  });
});
