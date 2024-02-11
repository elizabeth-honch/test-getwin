import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPokemonByName, setPokemon } from '../../store/pokemonSlice';
import { Image, Carousel, Button } from 'antd';
import styles from './styles.module.scss';
import { FilesT, GeneralNestedObjT } from './types';
import { Loader } from '../../uiComponents/Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const PokemonInfo:React.FC = () => {
  const [isEmptyName, setIsEmptyName] = useState<boolean>(false);
  const [files, setFiles] = useState<string[]>([]);
  const pokemon = useAppSelector((state) => state.pokemons.currentPokemon);
  const pokemonError = useAppSelector((state) => state.pokemons.errorCurrentPokemon);
  const pokemonLoading = useAppSelector((state) => state.pokemons.loadingCurrentPokemon);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const name = url.get('name');
    if (name && name?.length > 0) {
      dispatch(getPokemonByName(name));
    } else {
      setIsEmptyName(true);
    }

    return () => {
      setFiles([]);
      dispatch(setPokemon(null));
    };
  }, []);

  const formatValue = (data: GeneralNestedObjT[]) => {
    const names = data?.map((elem: GeneralNestedObjT) => {
      if (Object.prototype.hasOwnProperty.call(elem, 'ability')) {
        return elem?.ability?.name;
      }
      if (Object.prototype.hasOwnProperty.call(elem, 'version')) {
        return elem?.version?.name;
      }
      if (Object.prototype.hasOwnProperty.call(elem, 'move')) {
        return elem?.move?.name;
      }
      if (Object.prototype.hasOwnProperty.call(elem, 'type')) {
        return elem?.type?.name;
      }
    });
    return names.join(', ');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addNewFiles = (data: FilesT | any, allFiles: string[]) => {
    for (const key in data) {
      const value = data[key];
      if (typeof value === 'string') {
        allFiles.push(value);
      } else if (value) {
        addNewFiles(value, allFiles);
      }
    }
  };

  useEffect(() => {
    if (pokemon && Object.values(pokemon?.sprites).length > 0) {
      const allFiles: string[] = [];
      addNewFiles(pokemon.sprites, allFiles);
      setFiles(allFiles);
    }
  }, [pokemon])

  return (
    <section className={styles.pokemon}>
      <p>
        <Button
          onClick={() => navigate(-1)}
          type='link'
          className={styles.pokemon__link}
        >
          Main
        </Button>
        /
        <span className={styles.pokemon__active}>Pokemon page</span>
      </p>
      {pokemon && (
        <div>
          <Carousel
            className={styles.carousel}
            autoplay
            autoplaySpeed={2000}
            dots={false}
          >
            {files.length > 0 && files?.map((url: string) => (
              <Image
                width={150}
                height={150}
                src={url}
                alt={url}
                key={url}
              />
            ))}
          </Carousel>
          
          <p className={styles.pokemon__label}>Id:
            <span className={styles.pokemon__value}>{pokemon?.id}</span>
          </p>
          <p className={styles.pokemon__label}>Name:
            <span className={styles.pokemon__value}>{pokemon?.name}</span>
          </p>
          <p className={styles.pokemon__label}>Weight:
            <span className={styles.pokemon__value}>{pokemon?.weight}</span>
          </p>
          <p className={styles.pokemon__label}>Height:
            <span className={styles.pokemon__value}>{pokemon?.height}</span>
          </p>
          <p className={styles.pokemon__label}>Experience:
            <span className={styles.pokemon__value}>{pokemon?.base_experience || 0}</span>
          </p>
          <p className={styles.pokemon__label}>Types:
            {pokemon?.types?.map((type: GeneralNestedObjT) => (
              <Link
                key={type?.type?.name}
                to={`/?type=${type?.type?.name}`}
                className={styles.pokemon__type}
              >
                {type?.type?.name}
              </Link>
            ))}
          </p>
          <p className={styles.pokemon__label}>Abilities:
            <span className={styles.pokemon__value}>{formatValue(pokemon?.abilities) || 0}</span>
          </p>
          <p className={styles.pokemon__label}>Game indices:
            <span className={styles.pokemon__value}>{formatValue(pokemon?.game_indices) || 0}</span>
          </p>
          <p className={styles.pokemon__label}>Moves:
            <span className={styles.pokemon__value}>{formatValue(pokemon?.moves)}</span>
          </p>
        </div>
      )}
      {pokemonError && (
        <p className={styles.pokemon__error}>{pokemonError.name}, {pokemonError.message}</p>
      )}
      {isEmptyName && (
        <p className={styles.pokemon__error}>Name is empty.</p>
      )}
      {pokemonLoading && <Loader />}
    </section>
  );
};
