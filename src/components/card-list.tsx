'use client'

import { useListContext } from "@/app/provider";
import { Box, Button, Card, CardBody, Grid, Heading, HStack, Stack, Tag } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { colours } from "./types-colors";

export default function CardList() {
  const { data, states, action } = useListContext()
  const list = data.list
  const router = useRouter()
  const capitalize = (s:string) => (s ? s[0].toUpperCase() + s.slice(1) : "")
  console.log('data,',data)
  return (
      <Grid gridTemplateColumns={'repeat(auto-fit, minmax(270px, 1fr))'} width='100%' gap='20px'>
        {list.map(pok => <Card key={pok.name} size='sm' maxW='20em'
          _hover={{ boxShadow: "0 0 3px black", marginTop: "-5px" }}
          style={{
            transition: 'margin-top ease 0.5s',
            cursor: 'pointer'
          }}
          onClick={()=>router.push('/pokemon/'+pok.id)}
        >
          <Box position='absolute' top={0} p='2'>
            <Heading fontSize={'xl'}>#{pok.id}</Heading>
          </Box>
          <Stack>
            <img
              src={pok.pokemon_v2_pokemonsprites[0].sprites || 'https://img.pokemondb.net/sprites/heartgold-soulsilver/back-normal/psyduck.png'}
              alt={pok.name}
              loading="lazy"
            />
            <CardBody as={Stack} gap='4'>
              <Heading fontSize={'xl'}>
                {capitalize(pok.name)}
              </Heading>
              <HStack flexWrap={'wrap'}>
              {pok.pokemon_v2_pokemontypes.map(type =>
                <Tag key={type.pokemon_v2_type.name} bgColor={colours[type.pokemon_v2_type.name]}>{type.pokemon_v2_type.name}</Tag>
              )}
              </HStack>
               <Button width={'100%'} size='sm' onClick={e=>{
                e.stopPropagation()
                action.setCompare(prev=>([...prev, pok]))
               }}
               isDisabled={states.compare.length >= 3 || states.compare.map(p=>p.id).includes(pok.id)}
               >Compare +</Button>
            </CardBody>
           
          </Stack>
        </Card>)}
      </Grid>
  );
}
