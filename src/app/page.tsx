//import Image from "next/image";

import styles from './page.module.css'
import Link from "next/link";
import Image from "next/image";

type Pokemon = {
  name: string;
  url: string;
  sprite: string;
}

async function fetchPokemon(): Promise<Pokemon[]> {
  const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const jsonResult = await result.json();
  
  const pokemonsWithSprites = await Promise.all(
    jsonResult.results.map(async (pokemon: Pokemon) => {
      const id = pokemon.url.split('/')[6];
      const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const details = await pokemonDetails.json();
      return {
        ...pokemon,
        sprite: details.sprites.other.dream_world.front_default
      };
    })
  );
  
  return pokemonsWithSprites;
}




export default async function Home() {
  const pokemons = await fetchPokemon();

  return (
    <main className={styles.main}>
      <h1 className="text-center text-5xl font-bold mb-5">Lista de Pokemons</h1>
      <section className={styles.pokemonList}>
        {pokemons.map((pokemon: Pokemon) => {
          const id = pokemon.url.split('/')[6];
          return (
            <Link href={`/pokemon/${id}`} key={pokemon.name}>
            <div className={styles.pokemonItem}>
              <p className={styles.pokemon}>{("00" + id).slice(-3)}</p>
              <p className={styles.pokemon}>{pokemon.name}</p>
              <Image
                src={pokemon.sprite}
                alt='imagem_pokemon'
                width={50}
                height={50}
                className={styles.pokemonImage}
              />
            </div>
            </Link>
         
          )
        })
        }
      </section>
      <Link href='/about'>About</Link>
    </main>
  )
}