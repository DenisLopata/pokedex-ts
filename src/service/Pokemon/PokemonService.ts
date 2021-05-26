import { Pokemon } from "../../types/pokemon";
import { PokemonServiceDAL } from "../PokemonDAL/PokemonServiceDAL";

export namespace PokemonService {
  //get pokemon by id
  export const GetPokemonByID = (pokemonID: number) => {
    return PokemonServiceDAL.GetPokemonByID(pokemonID);
  };

  //get pokemon data from pokemon name
  export const GetPokemonByName = (name: string): Promise<Pokemon.IPokemon> => {
    return PokemonServiceDAL.GetPokemonByName(name);
  };

  //get all pokemon data from evolution chain
  export const GetPokemonEvolutionChainData = async (
    url: string
  ): Promise<Array<Pokemon.IPokemon>> => {
    return PokemonServiceDAL.GetResource<Pokemon.IEvolution>(url)
      .then((pokemonEvolutionResponse) => {
        let evolutions: Array<string> = Array<string>();
        //evolution chain data to get species and pokemon data
        if (pokemonEvolutionResponse?.chain !== undefined) {
          // get all species from evolution
          PokemonService.GetEvolutionSpeciesNames(
            pokemonEvolutionResponse.chain,
            evolutions
          );
        }
        return evolutions;
      })
      .then(async (evolutions) => {
        //get all pokemon data from species
        let pokemonEvolutionDataResponse: Array<Pokemon.IPokemon> = Array<Pokemon.IPokemon>();
        for (let i = 0; i < evolutions.length; i++) {
          await PokemonServiceDAL.GetPokemonByName(evolutions[i]).then(
            (poke) => {
              // some pokemon have wierd species name, different from pokemon name and we get no evolution data
              // for example pokemon ID 642, check species name and pokemon name
              if (poke !== undefined) {
                pokemonEvolutionDataResponse.push(poke);
              }
            }
          );
        }
        return pokemonEvolutionDataResponse;
      });
  };

  //get data for evolution chart component
  export const GetEvolutionChartData = async (
    speciesName: string
  ): Promise<Array<Pokemon.IPokemon>> => {
    return PokemonServiceDAL.GetPokemonSpeciesByName(speciesName).then(
      async (response) => {
        return await PokemonService.GetPokemonEvolutionChainData(
          response.evolution_chain.url
        );
      }
    );
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
