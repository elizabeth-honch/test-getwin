export type NestedObjT = {
  name: string;
  url: string;
};

export type PokemonsByType = {
  pokemon: NestedObjT;
  slot: number;
};

export type TypesT = {
  value: string;
  label: string;
};