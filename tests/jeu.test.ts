import { describe, expect, it } from "vitest";
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
