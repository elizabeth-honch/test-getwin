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

export type GeneralNestedObjT = {
  ability?: NestedObj;
  is_hidden?: boolean;
  slot?: number;
  game_index?: number;
  version?: NestedObj;
  move?: NestedObj;
  version_group_details?: {
    level_learned_at?: number;
    move_learn_method?: NestedObj;
    version_group?: NestedObj;
  }[];
  type?: NestedObj;
  moves?: {
    move: NestedObj;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: NestedObj;
      version_group: NestedObj;
    }[];
  }[];
};

export type FilesT = {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: {
    dream_world?: GenerationT;
    home?: GenerationT;
    "official-artwork"?: GenerationT;
    showdown?: GenerationT;
  },
  versions?: {
    "generation-i"?: {
      "red-blue"?: GenerationT;
      "yellow"?: GenerationT;
    },
    "generation-ii"?: {
      "crystal"?: GenerationT;
      "gold"?: GenerationT;
      "silver"?: GenerationT;
    };
    "generation-iii"?: {
      "emerald"?: GenerationT;
      "firered-leafgreen"?: GenerationT;
      "ruby-sapphire"?: GenerationT;
    },
    "generation-iv"?: {
      "diamond-pearl"?: GenerationT;
      "heartgold-soulsilver"?: GenerationT;
      "platinum"?: GenerationT;
    },
    "generation-v"?: {
      "black-white"?: GenerationT;
    },
    "generation-vi"?: {
      "omegaruby-alphasapphire"?: GenerationT;
      "x-y"?: GenerationT;
    },
    "generation-vii"?: {
      "icons"?: GenerationT;
      "ultra-sun-ultra-moon"?: GenerationT;
    },
    "generation-viii"?: {
      "icons"?: GenerationT;
    }
  }
};