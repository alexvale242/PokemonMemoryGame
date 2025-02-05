<script lang="ts">
  import { onMount } from 'svelte';

  interface Pokemon {
    name: string;
    url: string;
    image: string;
    flipped: boolean;
  }

  let pokemonList: Pokemon[] = [];

  onMount(async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=36');
    const data = await response.json();
    pokemonList = data.results.map((pokemon: { name: string, url: string }) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      return {
        ...pokemon,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        flipped: false
      };
    });
  });

  function flipCard(index: number) {
    pokemonList = pokemonList.map((pokemon, i) => 
      i === index ? { ...pokemon, flipped: !pokemon.flipped } : pokemon
    );
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
  .card {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    position: relative;
  }
  .card img {
    width: 100px;
    height: 100px;
  }
  .card.flipped {
    background-color: #f0f0f0;
  }
  .card .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
  }
  .card .back img {
    width: 100px;
    height: 100px;
  }
</style>

<div class="grid">
  {#each pokemonList as pokemon, index}
    <div class="card {pokemon.flipped ? 'flipped' : ''}" on:click={() => flipCard(index)}>
      {#if !pokemon.flipped}
        <img src={pokemon.image} alt={pokemon.name} />
        <p>{pokemon.name}</p>
      {:else}
        <div class="back">
          <img src="src/assets/enable-logo-500w.png" alt="Enable Logo" />
        </div>
      {/if}
    </div>
  {/each}
</div>