import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  Params,
  PokemonT,
  PokemonsAndTypesT,
  PokemonsByTypeT,
  initialStateT,
} from './types';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const initialState: initialStateT = {
  pokemons: null,
  loadingPokemons: false,
  errorPokemons: null,
  currentPokemon: null,
  loadingCurrentPokemon: false,
  errorCurrentPokemon: null,
  pokemonTypes: null,
  loadingPokemonTypes: false,
  errorPokemonTypes: null,
  pokemonsByType: null,
  loadingPokemonsByType: false,
  errorPokemonsByType: null,
};

export const getPokemons = createAsyncThunk<PokemonsAndTypesT, Params>(
  'pokemons/getPokemons',
  async (param) => {
    const { limit, offset } = param;
    const response = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  }
);

export const getPokemonByName = createAsyncThunk<PokemonT, string>(
  'pokemons/getPokemonByName',
  async (name) => {
    try {
      const response = await fetch(`${BASE_URL}pokemon/${name}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
      
    } catch (error) {
      throw new Error(`Not found pokemon by this name.`);
    }
  }
);

export const getPokemonTypes = createAsyncThunk<PokemonsAndTypesT>(
  'pokemons/getPokemonTypes',
  async () => {
    const response = await fetch(`${BASE_URL}type`);
    const data = await response.json();
    return data;
  }
);

export const getPokemonsByType = createAsyncThunk<PokemonsByTypeT, string>(
  'pokemons/getPokemonsByType',
  async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
      
    } catch (error) {
      throw new Error(`Not found pokemon by this type.`);
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<null>) => {
      state.currentPokemon = action.payload;
      state.loadingCurrentPokemon = false;
      state.errorCurrentPokemon = null;
    }
  },
  extraReducers(builder){
    builder
      .addCase(getPokemons.pending, (state) => {
        state.loadingPokemons = true
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.loadingPokemons = false;
        state.errorPokemons = null;
        state.pokemons = action.payload;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.loadingPokemons = false;
        state.errorPokemons = action.error;
        state.pokemons = null;
      })
      .addCase(getPokemonByName.pending, (state) => {
        state.loadingCurrentPokemon = true
      })
      .addCase(getPokemonByName.fulfilled, (state, action) => {
        state.loadingCurrentPokemon = false;
        state.errorCurrentPokemon = null;
        state.currentPokemon = action.payload;
      })
      .addCase(getPokemonByName.rejected, (state, action) => {
        state.loadingCurrentPokemon = false;
        state.errorCurrentPokemon = action.error;
        state.currentPokemon = null;
      })
      .addCase(getPokemonTypes.pending, (state) => {
        state.loadingPokemonTypes = true;
      })
      .addCase(getPokemonTypes.fulfilled, (state, action) => {
        state.loadingPokemonTypes = false;
        state.errorPokemonTypes = null;
        state.pokemonTypes = action.payload;
      })
      .addCase(getPokemonTypes.rejected, (state, action) => {
        state.loadingPokemonTypes = false;
        state.errorPokemonTypes = action.error;
        state.pokemonTypes = null;
      })
      .addCase(getPokemonsByType.pending, (state) => {
        state.loadingPokemonsByType = true;
      })
      .addCase(getPokemonsByType.fulfilled, (state, action) => {
        state.loadingPokemonsByType = false;
        state.errorPokemonsByType = null;
        state.pokemonsByType = action.payload;
      })
      .addCase(getPokemonsByType.rejected, (state, action) => {
        state.loadingPokemonsByType = false;
        state.errorPokemonsByType = action.error;
        state.pokemonsByType = null;
      })
  }
});

export default pokemonSlice.reducer;
export const { setPokemon } = pokemonSlice.actions;