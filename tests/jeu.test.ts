import { describe, expect, it } from "vitest";
import { Jeu } from "../src/jeu";

describe("score initial", () => {
  it("renvoie zéro-zéro lorsque personne n'a marqué de point", () => {
    const jeu = new Jeu("Alice", "Bob");

    expect(jeu.score()).toBe("Zéro-Zéro");
  });
});
