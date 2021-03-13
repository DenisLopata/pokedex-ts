import React from "react";
import { Pokemon } from "../../types/pokemon";

interface IEvolutionChartProps {
  pokemonEvolutionData: Array<Pokemon.IPokemon> | undefined;
  selectedPokemonID: number | undefined;
}

export const EvolutionChart = ({
  pokemonEvolutionData,
  selectedPokemonID,
}: IEvolutionChartProps) => {
  return (
    <div>
      {pokemonEvolutionData !== undefined && pokemonEvolutionData.length > 0 ? (
        <div>
          <h2>Evolution chart</h2>
          {pokemonEvolutionData?.map((pokemon: Pokemon.IPokemon) => (
            <div>
              {pokemon.name}
              <img
                width={120}
                height={120}
                alt="imgSpriteEvolution"
                src={pokemon.sprites.other["official-artwork"].front_default}
              ></img>

              {selectedPokemonID !== undefined &&
              pokemon.id == selectedPokemonID ? (
                <div>we selected bois</div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>no evolution data</div>
      )}
    </div>
  );
};
