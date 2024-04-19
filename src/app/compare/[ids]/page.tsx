import DetailCard, { Pokemon } from "@/components/detail-card"
import HeaderSimple from "@/components/header-simple"
import {HStack} from "@chakra-ui/react"
import React from "react"

type PageProps = {
  params: {
    ids: string
  }
}

const PokemonDetail = async (props: PageProps) => {
  const idsString = props.params.ids
  const idss = idsString.split('-').map(id=>Number(id))
  const ids = JSON.stringify(idss)
  const query2 = `query pokemonDetail {
    pokemon: pokemon_v2_pokemon(where: {id: {_in: ${ids}}}) {
      name
      height
      id
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
      }
      pokemon_v2_pokemonsprites {
        sprites(path: "other.home.front_default")
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }`
  const res = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query2
    })
  })
  const { data } = await res.json()
  const pokemons: Pokemon[] = data.pokemon
  return (
    <>
    <HeaderSimple/>
    <HStack width='100%' h='100%' p={'8'} justifyContent='center' alignItems={'flex-start'} gap='12'>
      {pokemons.map(pok=><DetailCard pokemon={pok} key={pok.id}/>)}
    </HStack>
    </>
  );
};
export default PokemonDetail;