'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function PokemonDetailView({ name }: { name: string }) {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon-detail', name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      return res.json()
    },
  })

  if (isLoading) return <div>Cargando...</div>

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold capitalize mb-4 text-center">{pokemon.name}</h1>
      
      <div className="flex justify-center">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          width={250}
          height={250}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Tipos</h2>
        <div className="flex gap-2">
          {pokemon.types.map((t: any) => (
            <span key={t.type.name} className="bg-blue-100 px-3 py-1 rounded capitalize">
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Estadísticas</h2>
        <ul>
          {pokemon.stats.map((s: any) => (
            <li key={s.stat.name} className="flex justify-between py-1 border-b">
              <span className="capitalize">{s.stat.name}</span>
              <span className="font-semibold">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}