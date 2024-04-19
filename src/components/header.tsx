'use client'

import { useListContext } from "@/app/provider";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CloseButton, Grid, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Select, Spacer, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import HeaderSimple from "./header-simple";


export default function Header() {
  const { data, action, states } = useListContext()
  const [search, setSearch] = React.useState('')
  const types = data.typeList
  const { pageSize } = states
  const router = useRouter()
  return (
    <HeaderSimple>
      <Grid gridTemplateColumns={'3fr 2fr 1fr 1fr auto'} width='100%' gap='20px'>
        <InputGroup size='md'>
          <Input type='search' placeholder="Search pokemon..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={(e) => {
            if (e.key == "Enter") {
              action.setSearch(search)
              action.setOffset(0)
            }
          }} />
          <InputRightElement width='6rem'>
            <Button h='1.75rem' size='sm' onClick={() => {
              action.setSearch(search)
              action.setOffset(0)
            }}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Select minW='200px' value={states.orderBy} onChange={e => {
          action.setOrderBy(e.target.value)
          action.setOffset(0)
        }}>
          <option value={'asc'}>Ascending</option>
          <option value={'desc'}>Descending</option>
        </Select>
        <Select minW='200px' value={states.type} onChange={e => {
          action.setType(e.target.value ? Number(e.target.value) : undefined)
          action.setOffset(0)
        }}>
          <option value={undefined}>No filter</option>
          {types.map(type => <option value={type.id} key={type.id}>{type.name}</option>)}
        </Select>
        <ButtonGroup size='md' isAttached variant='outline'>
          <IconButton aria-label='Previous' icon={<ChevronLeftIcon />} isDisabled={states.offset < pageSize} onClick={() => action.setOffset(states.offset - pageSize)} />
          <IconButton aria-label='Next' icon={<ChevronRightIcon />} isDisabled={data.list.length < pageSize} onClick={() => action.setOffset(states.offset + pageSize)} />
        </ButtonGroup>
      </Grid>

      {!!states.compare.length && <HStack gap={'4'} justifyContent='flex-end'>
        <Stack gap={'4'}>
          <Button size={'sm'} onClick={() => router.push(`/compare/${states.compare.map(pok => pok.id).join('-')}`)}>
            Compare
          </Button>
          <Button size={'sm'} onClick={() => action.setCompare([])}>
            Clear
          </Button>
        </Stack>
        {states.compare.map((pok, idx) => <Card>
          <img
            src={pok.pokemon_v2_pokemonsprites[0].sprites || 'https://img.pokemondb.net/sprites/heartgold-soulsilver/back-normal/psyduck.png'}
            alt={pok.name}
            loading="lazy"
            height={120}
            width={120}
          />
          <Box position='absolute' top={0} bottom={0} p='2' width='100%'>
            <Stack justifyContent={'space-between'} height='100%' >
              <HStack justifyContent={'space-between'}>
                <Heading fontSize={'md'}>#{pok.id}</Heading>
                <CloseButton onClick={() => {
                  const draftList = [...states.compare]
                  draftList.splice(idx, 1)
                  action.setCompare(draftList)
                }} />
              </HStack>
              <Heading fontSize={'md'}>{pok.name}</Heading>
            </Stack>
          </Box>
        </Card>)}
      </HStack>}
    </HeaderSimple>
  );
}
