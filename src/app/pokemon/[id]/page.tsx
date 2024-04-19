import DetailCard, { Pokemon } from "@/components/detail-card"
import HeaderSimple from "@/components/header-simple"
import {Stack} from "@chakra-ui/react"
import React from "react"
import fetch from "cross-fetch"

type PageProps = {
  params: {
    id: string
  }
}

const PokemonDetail = async (props: PageProps) => {
  const query2 = `query pokemonDetail {
    pokemon: pokemon_v2_pokemon_by_pk(id: ${props.params.id}) {
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
  }
  `
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
  const pokemon: Pokemon = data.pokemon
  return (
    <>
    <HeaderSimple/>
    <Stack width='100%' h='100%' p={'8'} justifyContent='center' alignItems={'center'}>
     <DetailCard pokemon={pokemon}/>
    </Stack>
    </>
  );
};
export default PokemonDetail;