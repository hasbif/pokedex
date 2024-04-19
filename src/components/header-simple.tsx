import { Box, Button, ButtonGroup, Card, CloseButton, Grid, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Select, Spacer, Stack } from "@chakra-ui/react";
import React from "react";


export default function HeaderSimple(props: {children?: React.ReactNode}) {
  return (
    <Box background={'white'} px={'8'} py={'4'} as={Stack} gap='2'>
      <a href="/" data-testid='logoIcon'>
        <img
          src={"https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"}
          alt={'Pokemon Pokedex'}
          style={{ height: '32px' }}
        />
      </a>
      {props.children}
    </Box>
  );
}
