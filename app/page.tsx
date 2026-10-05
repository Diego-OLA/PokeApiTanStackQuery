import Image from "next/image";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import PokemonList from '@/components/PokemonList'
import PokemonInfiniteList from '@/components/PokemonInfiniteScrollList'

async function getPokemonList(limit= 50,offset = 0) {

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  return res.json()
}
export default async function Home() {
  const queryClient = getQueryClient()

  //prefecth inicial en el servidor 
  await queryClient.prefetchQuery({
    queryKey: ['pokemon-list',50,0],
    queryFn: ()=> getPokemonList(50,0),
  })
  return (

    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Pokédex</h1>
        <PokemonInfiniteList />
      </main>
    </HydrationBoundary>
   
  );
}
