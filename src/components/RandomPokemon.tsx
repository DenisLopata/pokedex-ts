import React, { useState } from "react";
import { PokemonService } from "../service/Pokemon/PokemonService";
import { Pokemon } from "../types/pokemon";
import { EvolutionChart } from "./Pokemon/EvolutionChart";
import { UserInputForm } from "./Pokemon/UserInputForm";
import { LoadingSpinner } from "./Shared/LoadingSpinner";

var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

export const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon.IPokemon>();
  const [pokemonEvolutionData, setPokemonEvolutionData] = useState<
    Array<Pokemon.IPokemon>
  >();

  const GetPokemon = () => {
    setPokemonEvolutionData(Array<Pokemon.IPokemon>());
    P.getPokemonByName(Math.floor(Math.random() * 898) + 1) // with Promise
      .then(async function (response: Pokemon.IPokemon) {
        console.log(response);
        //set pokemon data to state
        setPokemon(response);
        //get species
        if (response !== undefined) {
          let pokemonEvolutionDataResponse: Array<Pokemon.IPokemon> = await PokemonService.GetPokemonSpecies(
            response.species.name
          );
          // set pokemon from evolution to state
          setPokemonEvolutionData(pokemonEvolutionDataResponse);
        }
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  return (
    <div>
      <UserInputForm></UserInputForm>
      {pokemon?.sprites !== undefined ? (
        <div>
          <h1>name: {pokemon?.name}</h1>
          <h4>id: {pokemon?.id}</h4>
          <img
            alt="imgSprite"
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
          ></img>
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
      ) : (
        <div>
          <LoadingSpinner width={240} height={240}></LoadingSpinner>
          <div>round, round baby round, round</div>
        </div>
      )}
      <button onClick={GetPokemon}>Get pokemon</button>
    </div>
  );
};
