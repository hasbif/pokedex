import { colours } from "@/components/types-colors"
import { Box, Card, CardBody, Grid, Heading, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text } from "@chakra-ui/react"
import React from "react"


export type Pokemon = {
  name: string,
  height: number,
  id: number,
  weight: number,
  base_experience: number,
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string,
      id: number
    }
  }[],
  pokemon_v2_pokemonsprites: {
    sprites?: string
  }[],
  pokemon_v2_pokemonstats: {
    base_stat: number,
    pokemon_v2_stat: {
      name: string
    }
  }[],
  pokemon_v2_pokemonabilities:
  {
    pokemon_v2_ability: {
      name: string
    }
  }[]
}


const DetailCard = (props: {pokemon: Pokemon}) => {
  const {pokemon} = props
  const pictureBg = colours[pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name]
  const capitalize = (s:string) => (s ? s[0].toUpperCase() + s.slice(1) : "")
  return (
      <Card bg='linear-gradient(to bottom right, #FF0000, #FFDE00)' maxW='30em'>
        <CardBody as={Grid} gridTemplateColumns={'1fr'} p='0'>
          <Stack padding={'8'}>
            <Box borderRadius={8} border='4px solid white' background={pictureBg}>
              <img
                src={pokemon.pokemon_v2_pokemonsprites[0].sprites || 'https://img.pokemondb.net/sprites/heartgold-soulsilver/back-normal/psyduck.png'}
                alt={pokemon.name}
                loading="lazy"
                role='detailImage'
              />
            </Box>
          </Stack>

          <Stack padding='4' gap='4' background={'white'} role='detailName'>
            <HStack justifyContent={'space-between'}>
            <Heading>
              {capitalize(pokemon.name)}
            </Heading>
            <Heading>
              #{pokemon.id}
            </Heading>
            </HStack>
            <HStack>
              {pokemon.pokemon_v2_pokemontypes.map(type => <Tag key={type.pokemon_v2_type.id} bgColor={colours[type.pokemon_v2_type.name]}>
                {type.pokemon_v2_type.name}
              </Tag>)}
            </HStack>
            <Card>
              <Tabs isFitted variant='enclosed' role='detailInfo'>
                <TabList mb='1em'>
                  <Tab>Basic</Tab>
                  <Tab>Stats</Tab>
                  <Tab>Abilities</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Grid gridTemplateColumns={'1fr 1fr'} columnGap='4'>
                      <Text>
                        Height
                      </Text>
                      <Text>{pokemon.height}</Text>
                      <Text>
                        Weight
                      </Text>
                      <Text>{pokemon.weight}</Text>
                      <Text>
                        Base XP
                      </Text>
                      <Text>{pokemon.base_experience}</Text>
                    </Grid>
                  </TabPanel>

                  <TabPanel>
                    <Grid gridTemplateColumns={'1fr 1fr'} columnGap='4'>
                      {pokemon.pokemon_v2_pokemonstats.map(stat => <React.Fragment key={stat.pokemon_v2_stat.name}>
                        <Text>
                          {capitalize(stat.pokemon_v2_stat.name)}
                        </Text>
                        <Text>
                          {stat.base_stat}
                        </Text>
                      </React.Fragment>)}
                    </Grid>
                  </TabPanel>
                  <TabPanel as={Stack}>
                    {pokemon.pokemon_v2_pokemonabilities.map(abb => <Tag w='max-content' key={abb.pokemon_v2_ability.name}>
                      {abb.pokemon_v2_ability.name}
                    </Tag>)}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </Stack>
        </CardBody>
      </Card>
  );
};
export default DetailCard;