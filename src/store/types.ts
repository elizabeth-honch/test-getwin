type NestedObj = {
  name: string;
  url: string;
};

type GenerationT = {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
};

export type PokemonsAndTypesT = {
  count: number;
  next: string;
  previous: null | number;
  results: NestedObj[],
};

export type PokemonT = {
  abilities: {
    ability: NestedObj
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  },
  forms: NestedObj[];
  game_indices: {
    game_index: number;
    version: NestedObj;
  }[];
  height: number;
  held_items: [],
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: NestedObj;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: NestedObj;
      version_group: NestedObj;
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: [],
  past_types: [],
  species: NestedObj;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: GenerationT;
      home: GenerationT;
      "official-artwork": GenerationT;
      showdown: GenerationT;
    },
    versions: {
      "generation-i": {
        "red-blue": GenerationT;
        "yellow": GenerationT;
      },
      "generation-ii": {
        "crystal": GenerationT;
        "gold": GenerationT;
        "silver": GenerationT;
      };
      "generation-iii": {
        "emerald": GenerationT;
        "firered-leafgreen": GenerationT;
        "ruby-sapphire": GenerationT;
      },
      "generation-iv": {
        "diamond-pearl": GenerationT;
        "heartgold-soulsilver": GenerationT;
        "platinum": GenerationT;
      },
      "generation-v": {
        "black-white": GenerationT;
      },
      "generation-vi": {
        "omegaruby-alphasapphire": GenerationT;
        "x-y": GenerationT;
      },
      "generation-vii": {
        "icons": GenerationT;
        "ultra-sun-ultra-moon": GenerationT;
      },
      "generation-viii": {
        "icons": GenerationT;
      }
    }
  },
  stats: {
    "base_stat": number;
    "effort": number;
    "stat": NestedObj
  }[];
  types: {
    "slot": number;
    "type": NestedObj;
  }[];
  weight: number;
};

export type PokemonsByTypeT = {
  damage_relations: {
    double_damage_from: NestedObj[] | [];
    double_damage_to: NestedObj[] | [];
    half_damage_from: NestedObj[] | [];
    half_damage_to: NestedObj[] | [];
    no_damage_from: NestedObj[]  | [];
    no_damage_to: NestedObj[] | [];
  };
  game_indices: {
    game_index: number;
    generation: NestedObj
  }[];
  generation: NestedObj;
  id: number;
  move_damage_class: NestedObj;
  moves: NestedObj[] | [];
  name: string;
  names:{
    "language": NestedObj;
    "name": string;
  }[];
  past_damage_relations: NestedObj | [],
  pokemon: {
    "pokemon": NestedObj;
    "slot": number;
  }[];
};

export type initialStateT = {
  pokemons: PokemonsAndTypesT | null;
  loadingPokemons: boolean;
  errorPokemons: {
    name?: string;
    message?: string;
    stack?: string;
  } | null;
  currentPokemon: PokemonT | null;
  loadingCurrentPokemon: boolean;
  errorCurrentPokemon: {
    name?: string;
    message?: string;
    stack?: string;
  } | null;
  pokemonTypes: PokemonsAndTypesT | null;
  loadingPokemonTypes: boolean;
  errorPokemonTypes:  {
    name?: string;
    message?: string;
    stack?: string;
  } | null;
  pokemonsByType: PokemonsByTypeT | null;
  loadingPokemonsByType: boolean;
  errorPokemonsByType:  {
    name?: string;
    message?: string;
    stack?: string;
  } | null;
};

export type Params = {
  offset: number;
  limit: number;
};