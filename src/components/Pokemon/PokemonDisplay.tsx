import React from "react";
import { Pokemon } from "../../types/pokemon";

interface IPokemonDisplayProps {
  pokemon: Pokemon.IPokemon;
}

export const PokemonDisplay = ({ pokemon }: IPokemonDisplayProps) => {
  return (
    <div>
      <h1>name: {pokemon?.name}</h1>
      <h4>id: {pokemon?.id}</h4>
      <img
        alt="imgSprite"
        src={pokemon?.sprites?.other["official-artwork"]?.front_default}
      ></img>
    </div>
  );
};
