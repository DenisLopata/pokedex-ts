import { Pokemon } from "../../types/pokemon";

var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

export namespace PokemonServiceDAL {



  //get pokemon data from pokemon name
  export const GetResource = async <T>(url: string): Promise<T> => {
    return await P.resource(url)
      .then(async function (response: T) {
        return response;
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  //get pokemon data from pokemon name
  export const GetPokemonSpeciesByName = async (
    speciesName: string
  ): Promise<Pokemon.ISpecies> => {
    return await P.getPokemonSpeciesByName(speciesName)
      .then(async function (response: Pokemon.ISpecies) {
        return response;
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  //get pokemon data from pokemon name
  export const GetPokemonByName = async (
    name: string
  ): Promise<Pokemon.IPokemon> => {
    return await P.getPokemonByName(name)
      .then(function (response: Pokemon.IPokemon) {
        return response;
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  //get pokemon data from pokemon id
  export const GetPokemonByID = async (
    pokemonID: number
  ): Promise<Pokemon.IPokemon> => {
    return await P.getPokemonByName(pokemonID)
      .then(function (response: Pokemon.IPokemon) {
        return response;
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };
}
