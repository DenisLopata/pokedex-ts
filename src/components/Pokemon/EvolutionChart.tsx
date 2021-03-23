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
                  style={pokemon.id === selectedPokemonID ? { border: "2px solid black" } : {border: "none"}}
                  width={120}
                  height={120}
                  alt="imgSpriteEvolution"
                  src={pokemon.sprites.other["official-artwork"].front_default}
                ></img>
            </div>
          ))}
        </div>
      ) : (
        <div>no evolution data</div>
      )}
    </div>
  );
};
