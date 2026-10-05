'use client'
import { useEffect } from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { getPokemonPage, getPokemonDetail } from '@/lib/pokemon'
import PokemonCard from './PokemonCard'




export default function PokemonInfiniteList() {
  const queryClient = useQueryClient()

  // Detecta cuándo el marcador invisible entra al viewport
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px', // Se activa 100px antes de llegar al fondo

  })

  const {
    data,fetchNextPage,hasNextPage,
    isFetchingNextPage,status,error
  } = useInfiniteQuery({
    queryKey:['pokemon-infinite'],
    queryFn: ({pageParam= 0})=> getPokemonPage({pageParam}),
    initialPageParam:0,
    getNextPageParam:(lastPage,allPages)  =>{
        // Si la API no devuelve siguiente URL, llegamos al final
      if (!lastPage.next) return undefined
      // El siguiente offset es la cantidad total de Pokémon cargados
      return allPages.length * 20
    }
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleMouseEnter = (name: string) => {
    queryClient.prefetchQuery({
      queryKey: ['pokemon-detail', name],
      queryFn: () => getPokemonDetail(name),
    })
  }

  if (status === 'pending') {
    return (
      <div className="flex justify-center p-8">
        <p className="text-gray-500 animate-pulse font-medium">
          Cargando Pokédex...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rejilla acumulativa de Pokémon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.pages.map((page) =>
          page.results.map((pokemon: { name: string; url: string }) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              onMouseEnter={() => handleMouseEnter(pokemon.name)}
              className=" rounded-xl p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer group"
            >
              <PokemonCard  key={pokemon.name} name={pokemon.name} url={pokemon.url}  />
            </Link>
          ))
        )}
      </div>

      {/* Marcador Centinela (Invisible) */}
      <div ref={ref} className="h-16 flex justify-center items-center py-4">
        {isFetchingNextPage ? (
          <p className="text-sm text-gray-500 animate-pulse">
            Cargando más Pokémon...
          </p>
        ) : !hasNextPage ? (
          <p className="text-sm text-gray-400">
            🎉 ¡Has llegado al final de la Pokédex!
          </p>
        ) : null}
      </div>
    </div>
  )
}