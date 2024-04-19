import * as React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

type PokemonItem = {
  "id": number,
  "name": string,
  "pokemon_v2_pokemonsprites": {
    "sprites": string
  }[],
  "pokemon_v2_pokemontypes": {
    "pokemon_v2_type": {
      "name": string,
      "id": number
    }
  }[]
}

type PokemonTypes = {
  id: number
  name: string
}

interface StoreProps {
  mockData?: PokemonItem[]
 }

interface ProviderProps extends StoreProps {
  children?: React.ReactNode;
}

type ContextType = {
  // setState: React.Dispatch<React.SetStateAction<ContextType["state"]>>;
  states: {
    compare: PokemonItem[],
    offset: number
    orderBy: string,
    search: string,
    type: number | undefined
    limit: number,
    pageSize: number
  };
  data: {
    list: PokemonItem[]
    loading?: boolean,
    typeList: PokemonTypes[],
  };
  action: {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setType: React.Dispatch<React.SetStateAction<number | undefined>>
    setOrderBy: React.Dispatch<React.SetStateAction<string>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
    setLimit: React.Dispatch<React.SetStateAction<number>>
    setCompare: React.Dispatch<React.SetStateAction<ContextType["states"]['compare']>>
  };
};

const initialValues: ContextType = {
  // setState: () => { },
  states: {
    offset: 0,
    orderBy: 'asc',
    search: '',
    type: undefined,
    limit: 10,
    compare: [],
    pageSize: 10
  },
  data: {
    list: [],
    typeList: []
  },
  action: {
    setSearch: () => { },
    setType: () => { },
    setOrderBy: () => { },
    setOffset: () => { },
    setLimit: () => { },
    setCompare: () => { }
  }
};

const context = React.createContext<ContextType>(initialValues);

export const useListContext = () => {
  const store = React.useContext(context);
  if (!store) {
    throw new Error(
      "Cannot use `useWorkspaceContext` outside of a WorkspaceProvider"
    );
  }
  return store;
};

const varQuery = gql`
query samplePokeAPIquery($limit: Int!, $offset: Int!, $order_by: order_by!, $where: pokemon_v2_pokemon_bool_exp) {
  pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: $order_by}, where: $where) {
    id
    name
    pokemon_species_id
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
        id
      }
    }
    pokemon_v2_pokemonsprites {
      sprites(path: "other.home.front_default")
    }
  }
}
`

const typeQuery = gql`
query pokemonTypes {
  pokemon_v2_type {
    id
    name
  }
}
`

const Store = (props: StoreProps) => {
  const pageSize = 10
  const [limit, setLimit] = React.useState(pageSize)
  const [offset, setOffset] = React.useState(0)
  const [orderBy, setOrderBy] = React.useState('asc')
  const [search, setSearch] = React.useState('')
  const [type, setType] = React.useState<number | undefined>(undefined)
  const [compare, setCompare] = React.useState<ContextType['states']['compare']>([])

  const variables = React.useMemo(() => {
    const typeQuery = type ? {
      "pokemon_v2_pokemontypes": {
        "type_id": {
          "_eq": type
        }
      }
    } : {}
    const vars = {
      limit,
      offset,
      order_by: orderBy,
      where: {
        "_and": {
          "is_default": {
            "_eq": true
          },
          "name": {
            "_ilike": `%${search}%`
          },
          ...typeQuery
        }
      }
    }
    return vars
  }, [search, type, limit, offset, orderBy])


  const [getList, { loading, data }] = useLazyQuery(varQuery);
  React.useEffect(()=>{
    getList({
      variables
    })
  },[variables])
  const { data: typeList } = useQuery(typeQuery, {
    fetchPolicy: 'cache-and-network'
  })

  console.log('context', props.mockData)

  return {
    states: {
      offset,
      orderBy,
      search,
      type,
      limit,
      compare,
      pageSize
    },
    data: {
      list: props.mockData || data?.pokemon_v2_pokemon as PokemonItem[] || [],
      loading,
      typeList: typeList?.pokemon_v2_type as PokemonTypes[] || []
    },
    action: {
      setSearch,
      setOffset,
      setOrderBy,
      setType,
      setLimit,
      setCompare
    }
  };
};

export const ListProvider = (props: ProviderProps) => {
  const { children, ...storeData } = props;
  return <context.Provider value={Store(storeData)} {...props} />;
};
