// lib/pokemon.ts

export async function getPokemonPage({ pageParam = 0 }: { pageParam?: number }) {
  const limit = 20
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  )
  if (!res.ok) throw new Error('Error al cargar la página de Pokémon')
  return res.json()
}

export async function getPokemonDetail(name:string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.json()
}