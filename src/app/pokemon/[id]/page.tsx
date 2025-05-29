import styles from './page.module.css'
import Image from 'next/image'

type PokemonParam = {
    params:{
        id: string;
    }
}

type PokemonDetails = {
    id: number;
    name: string;
    ability: string;
    baseExperience: number;
    height: number;
    sprite: string;
    type: string;
}

async function fetchPokemon(id: string): Promise<PokemonDetails> {
    const api_url = process.env.NEXT_PUBLIC_API_URL_POKEMONS as string;
    const result = await fetch(`${api_url}/${id}`, { next: { revalidate: 3600 } });
    const jsonResult = await result.json();
    //console.log(jsonResult);
    return ({
        id: jsonResult.id,
        name: jsonResult.name,
        ability: jsonResult.abilities[0].ability.name,
        baseExperience: jsonResult.base_experience,
        height: jsonResult.height,
        sprite: jsonResult.sprites.other.dream_world.front_default,
        type: jsonResult.types[0].type.name
    })
}

export default async function Pokemon({ params: { id } }: PokemonParam) {
    const pokemon = await fetchPokemon(id);
    console.log(pokemon)

    return (
        <main className={styles.main}>
            
            <section className={styles.container}>{pokemon && (
                <>
                    <h2 className={styles.pokemonName}>{pokemon.name}</h2>
                    <div className={styles.pokemonDetail}>
                        <section className={styles.detailSection}>
                            <p className={styles.pokemonData}>Habilidade: {pokemon.ability}</p>
                            <p className={styles.pokemonData}>EXP Inicial: {pokemon.baseExperience}</p>
                            <p className={styles.pokemonData}>Altura: {pokemon.height}</p>
                        </section>
                        <Image
                            src={pokemon.sprite}
                            alt='imagem_pokemon'
                            width={250}
                            height={250}
                            className={styles.pokemonImage}
                        />
                    </div>
                </>
            )}</section>
        </main>
    )
}