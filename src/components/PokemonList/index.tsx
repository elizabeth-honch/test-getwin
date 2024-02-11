import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPokemonTypes, getPokemons, getPokemonsByType } from "../../store/pokemonSlice";
import { Input, Card, List, Pagination, Spin, Select } from 'antd';
import { Loader } from "../../uiComponents/Loader";
import type { PaginationProps } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import styles from './styles.module.scss';
import type { SelectProps } from 'antd';
import { useSearchParams } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
import { NestedObjT, PokemonsByType, TypesT } from "./types";

const { Search } = Input;

const PokemonList:React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemons);
  const pokemonTypes = useAppSelector((state) => state.pokemons.pokemonTypes?.results);
  const pokemonsByType = useAppSelector((state) => state.pokemons.pokemonsByType?.pokemon);
  const pokemonsByTypeLoading = useAppSelector((state) => state.pokemons.loadingPokemonsByType);
  const [offset, setOffset] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [currentPageSize, setCurrentPageSize] = useState<number | null>(null);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedType, setSelectedType] = useState<TypesT>({value: '', label: ''});
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const calcOffset = (page: number, pageSize: number) => {
    return (page - 1) * pageSize;
  };

  useEffect(() => {
    if (!pokemonTypes) {
      dispatch(getPokemonTypes());
    }
    if (offset !== null && currentPageSize) {
      dispatch(getPokemons({offset, limit: currentPageSize}));
    }
  }, [dispatch, offset, currentPageSize]);

  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams({ page: "1", pageSize: "20" });
      setOffset(0);
      setCurrentPage(1);
      setCurrentPageSize(20);
    } else {
      const paramType = searchParams.get('type');
      if (paramType && pokemonTypes) {
        const currentTypeUrl = pokemonTypes.find(
          (type: NestedObjT) => type.name === paramType);
        if (currentTypeUrl) {
          setSelectedType({value: currentTypeUrl.url, label: paramType });
          dispatch(getPokemonsByType(currentTypeUrl.url));
        }
      } else {
        const paramPage = searchParams.get('page');
        const paramPageSize = searchParams.get('pageSize');
        const page = paramPage ? +paramPage : 1;
        const pageSize = paramPageSize ? +paramPageSize : 20;
        const currentOffset = calcOffset(page, pageSize);
        setOffset(currentOffset);
        setCurrentPage(page);
        setCurrentPageSize(pageSize);
      }
    }
  }, [searchParams, pokemonTypes]);

  const handlePagination: PaginationProps['onChange'] = (page, pageSize) => {
    const currentOffset = calcOffset(page, pageSize);
    setOffset(currentOffset);
    setCurrentPageSize(pageSize);
    setCurrentPage(page);
    setSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
  };
  
  const onSearch: SearchProps['onSearch'] = (value: string) => {
    navigate(`/pokemon?name=${value}&${searchParams.toString()}`);
  };

  const formatType = useCallback((types: NestedObjT[]) => {
    return types.map((type: NestedObjT) => {
      const { name, url } = type;
      return {
        label: name,
        value: url,
      };
    });
  }, []);

  const formatPokemons = (pokemons: PokemonsByType[]) => {
    return pokemons?.map((pokemon: PokemonsByType) => pokemon.pokemon);
  };

  useEffect(() => {
    if (pokemonTypes && pokemonTypes.length > 0) {
      setOptions(formatType(pokemonTypes));
    }
  }, [pokemonTypes, setOptions, formatType]);

  const handleChange = (option: { value: string; label: string }) => {
    if (option) {
      const { value, label } = option;
      dispatch(getPokemonsByType(value));
      setSelectedType(option);
      setSearchParams({'type': label});
    } else {
      setSearchParams({ page: "1", pageSize: "20" });
      setSelectedType({ value: '', label: ''});
    }
  };

  return (
    <section className={styles.pokemons}>
      {pokemons.pokemons
        ? (
          <>
            <h3 className={styles.pokemons__title}>Pokemons</h3>

            <div className={styles.pokemons__actions}>
              <Search
                placeholder="Type Pokemon name"
                allowClear
                enterButton="Search"
                size="middle"
                onSearch={onSearch}
                className={styles.pokemons__search}
              />

              <Select
                labelInValue
                allowClear
                style={{ width: '50%' }}
                placeholder="Select pokemon type"
                value={selectedType}
                onChange={handleChange}
                options={options}
                popupClassName={styles.pokemons__types}
              />
            </div>

            <Spin spinning={!!pokemons.loadingPokemons || !!pokemonsByTypeLoading}>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={
                  selectedType.value && pokemonsByType
                  ? formatPokemons(pokemonsByType)
                  : pokemons.pokemons?.results
                }
                className={styles.pokemons__list}
                renderItem={(item) => (
                  <Link
                    to={`/pokemon?name=${item.name}&${searchParams.toString()}`}
                  >
                    <List.Item className={styles.pokemons__block}>
                      <Card className={styles.pokemons__name}>
                        {item?.name}
                      </Card>
                    </List.Item>
                  </Link>
                )}
              />
            </Spin>

            {pokemons.pokemons?.count && !selectedType.value && currentPageSize && currentPage && (
              <Pagination
                total={pokemons.pokemons.count}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={currentPageSize}
                defaultCurrent={currentPage}
                current={currentPage}
                pageSize={currentPageSize}
                onChange={handlePagination}
                className={styles.pokemons__pagination}
              />
            )}
          </>
        )
        : !pokemons.loadingPokemons
        ? <p>Something went wrong.</p>
        : <Loader />
      }
    </section>
  );
};

export default PokemonList;