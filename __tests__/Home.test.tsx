import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { ListProvider } from '@/app/provider';
import { client } from '@/graphql/client';
import { ApolloProvider } from '@apollo/client';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

const mockData = [{
  "id": 1,
  "name": "bulbasaur",
  "pokemon_species_id": 1,
  "pokemon_v2_pokemontypes": [
    {
      "__typename": "pokemon_v2_pokemontype",
      "pokemon_v2_type": {
        "__typename": "pokemon_v2_type",
        "name": "grass",
        "id": 12
      }
    },
    {
      "__typename": "pokemon_v2_pokemontype",
      "pokemon_v2_type": {
        "__typename": "pokemon_v2_type",
        "name": "poison",
        "id": 4
      }
    }
  ],
  "pokemon_v2_pokemonsprites": [
    {
      "__typename": "pokemon_v2_pokemonsprites",
      "sprites": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
    }
  ]
}]

function renderHome() {
  return render(
    <ApolloProvider client={client()}>
    <ListProvider mockData={mockData}>
      <Home />
    </ListProvider>
    </ApolloProvider>
  );
}

it('should have search bar', () => {
  renderHome() //Arrange

  const myElement = screen.getByText('Search') //Act

  expect(myElement).toBeInTheDocument() // Assert
})
