'use client'

import { useQuery } from '@tanstack/react-query'
import PokemonCard from './PokemonCard'

export default function PokemonList() {
  const { data } = useQuery({
    queryKey: ['pokemon-list', 50, 0],
    queryFn: async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
      return res.json()
    },
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data?.results.map((pokemon: { name: string; url: string }) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  )
}