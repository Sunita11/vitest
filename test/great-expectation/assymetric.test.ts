import { v4 as id } from "uuid";
import { expect, it } from "vitest";

type ComputerScientist = {
  id: string;
  firstname: string;
  lastname: string;
  isCool?: boolean;
};

const createCompuetrScientist = (
  firstname: string,
  lastname: string
): ComputerScientist => ({
  id: "cs-" + id(),
  firstname,
  lastname,
});

const addToCoolKidsClun = (p: ComputerScientist, club: unknown[]) => {
  club.push({ ...p, isCool: true });
};

it("include cool computer scientists by virtue", () => {
  const people: ComputerScientist[] = [];

  addToCoolKidsClun(createCompuetrScientist("Grace", "Hopper"), people);
  addToCoolKidsClun(createCompuetrScientist("Ada", "Lovelace"), people);
  addToCoolKidsClun(createCompuetrScientist("Anie", "Easeluy"), people);
  addToCoolKidsClun(createCompuetrScientist("Dorothy", "Vaughn"), people);
});
