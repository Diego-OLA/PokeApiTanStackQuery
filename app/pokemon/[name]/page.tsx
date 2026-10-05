import { getQueryClient } from '../../get-query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import PokemonDetailView from '@/components/PokemonDetailView'

async function getPokemonDetail(name:string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return res.json()
}

export default async function PokemonDetailPage({params, }:{params: Promise<{name:string}>} ) {
    
    const { name } = await params
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({ // Se necesita en caso se pegue la URL del 
  // pokemon y no se haga HOVER antes
    queryKey:['pokemon-detail',name],
    queryFn: () => getPokemonDetail(name),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailView name={name} />
    </HydrationBoundary>
  )
}