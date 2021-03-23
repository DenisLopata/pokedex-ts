import React, { useState } from "react";
import { PokemonService } from "../service/Pokemon/PokemonService";
import { Pokemon } from "../types/pokemon";
import { EvolutionChart } from "./Pokemon/EvolutionChart";
import { PokemonDisplay } from "./Pokemon/PokemonDisplay";
import { UserInputForm } from "./Pokemon/UserInputForm";
import { LoadingSpinner } from "./Shared/LoadingSpinner";

export const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon.IPokemon>();
  const [pokemonEvolutionData, setPokemonEvolutionData] = useState<
    Array<Pokemon.IPokemon>
  >();

  const GetPokemon = async () => {
    setPokemonEvolutionData(Array<Pokemon.IPokemon>());

    await PokemonService.GetPokemonByID(Math.floor(Math.random() * 898) + 1) // with Promise
      .then(async (response) => {
        //get species
        if (response !== undefined) {
          //set pokemon data to state
          setPokemon(response);
          console.log(response.species.name);
          await PokemonService.GetEvolutionChartData(response.species.name).then(
            (pokemonEvolutionDataResponse) => {
              // set pokemon form evolution to state
              setPokemonEvolutionData(pokemonEvolutionDataResponse);
            }
          );
        }
      });
  };

  return (
    <div>
      <div>
        <UserInputForm></UserInputForm>
      </div>
      <div>
        {pokemon?.sprites !== undefined ? (
          <div>
            <div>
              <PokemonDisplay pokemon={pokemon}></PokemonDisplay>
            </div>
            <div>
              {pokemonEvolutionData !== undefined &&
              pokemonEvolutionData?.length > 0 ? (
                <EvolutionChart
                  pokemonEvolutionData={pokemonEvolutionData}
                  selectedPokemonID={pokemon?.id}
                ></EvolutionChart>
              ) : (
                <LoadingSpinner width={120} height={120}></LoadingSpinner>
              )}
            </div>
          </div>
        ) : (
          <div>
            <LoadingSpinner width={240} height={240}></LoadingSpinner>
            <div>round, round baby round, round</div>
          </div>
        )}
      </div>
      <div>
        <button onClick={GetPokemon}>Get pokemon</button>
      </div>
    </div>
  );
};
