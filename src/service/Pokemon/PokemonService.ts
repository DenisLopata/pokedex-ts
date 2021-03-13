import { Pokemon } from "../../types/pokemon";

var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

export namespace PokemonService {

  //get pokemon data from pokemon name
  export const GetPokemonByName = async (
    name: string
  ): Promise<Pokemon.IPokemon> => {
    return await P.getPokemonByName(name)
      .then(function (response: Pokemon.IPokemon) {
        let pokemonRespone: Pokemon.IPokemon = response as Pokemon.IPokemon;
        //get species
        if (pokemonRespone !== undefined) {
          return pokemonRespone;
        }
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  //get all pokemon data from evolution chain
  export const GetPokemonEvolutionChain = async (
    url: string
  ): Promise<Array<Pokemon.IPokemon>> => {
    return await P.resource(url)
      .then(async function (response: any) {
        console.log(response);
        let pokemonEvolutionResponse: Pokemon.IEvolution = response as Pokemon.IEvolution;
        //evolution chain data to get species and pokemon data
        if (pokemonEvolutionResponse?.chain !== undefined) {
          let evolutions: Array<string> = Array<string>();
          // get all species from evolution
          PokemonService.GetEvolutionSpeciesNames(
            pokemonEvolutionResponse.chain,
            evolutions
          );

          //get all pokemon data from species
          let pokemonEvolutionDataResponse: Array<Pokemon.IPokemon> = Array<Pokemon.IPokemon>();

          for (let i = 0; i < evolutions.length; i++) {
            const output = await PokemonService.GetPokemonByName(evolutions[i]);
            pokemonEvolutionDataResponse.push(output);
            console.log(output);
          }
          return pokemonEvolutionDataResponse;
        }
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  // get pokemon species of evolutions
  export const GetPokemonSpecies = async (
    speciesName: string
  ): Promise<Array<Pokemon.IPokemon>> => {
    return await P.getPokemonSpeciesByName(speciesName)
      .then(async function (response: Pokemon.ISpecies) {
        console.log(response);
        //get evolution
        if (response !== undefined) {
          return PokemonService.GetPokemonEvolutionChain(
            response.evolution_chain.url
          );
        }
      })
      .catch(function (error: any) {
        console.log("There was an ERROR: ", error);
      });
  };

  //recursive function for getting all species names in evolution
  export const GetEvolutionSpeciesNames = (
    evolutionChain: Pokemon.IEvolutionChain,
    evolutionSpeciesNames: Array<string>
  ) => {
    if (evolutionChain?.species !== undefined) {
      evolutionSpeciesNames.push(evolutionChain.species.name);
      if (evolutionChain.evolves_to.length > 0) {
        evolutionChain.evolves_to.forEach((element) => {
          GetEvolutionSpeciesNames(element, evolutionSpeciesNames);
        });
      }
    }
  };
}
