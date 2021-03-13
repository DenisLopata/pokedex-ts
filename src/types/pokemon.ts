
export namespace Pokemon {

    //getPokemonByName
    export interface IPokemon {
        id: number;
        sprites: Sprite;
        name: string;
        species: PokemonSpecies;
    }

     type Sprite = {
        other: SpriteOther;
    }

    type SpriteOther = {
        dream_world: Array<any>;
        "official-artwork": OfficialArtwork;
    }

    type OfficialArtwork = {
        front_default: string;
    }

    type PokemonSpecies = {
        name: string;
        url: string;
    }

    //getPokemonSpeciesByName
    export interface ISpecies {
        id: number;
        name: string;
        order: number;
        evolution_chain: SpeciesEvolutionChain;
    }

    type SpeciesEvolutionChain = {
        url: string;
    }

    //get evolution chain
    export interface IEvolution {
        id: number;
        chain: IEvolutionChain;
        baby_trigger_item: any;
    }

    export interface IEvolutionChain {
        evolution_details: Array<any>;
        evolves_to: Array<IEvolutionChain>;
        species: EvolutionSpecies;
        is_baby: boolean;
    }

    type EvolutionSpecies = {
        name: string;
        url: string;
    }

}