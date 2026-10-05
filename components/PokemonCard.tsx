'use client'

import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'

interface PokemonCardProps {
  name: string
  url: string
}

async function fetchPokemonDetails(name:string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.json()
}

export default function PokemonCard({name,url}:PokemonCardProps){
    const queryClient = useQueryClient()
    const id = url.split('/').filter(Boolean).pop()

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    // Disparar prefetch al pasar el mouse

    const handleMouseEnter = () => {
        queryClient.prefetchQuery({
            queryKey: ['pokemon-detail',name],
            queryFn:()=> fetchPokemonDetails(name),
            staleTime:1000*5*60 // Guarda cache por 5 minutos
        })
    }
    return(
        <Link
        href={`/pokemon/${name}`}
        onMouseEnter={handleMouseEnter}
        className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
        >
            <Image src={imageUrl} alt={name} width={120} height={120} />
            <span className="capitalize mt-2 font-semibold">{name}</span>
        </Link>
    )
}