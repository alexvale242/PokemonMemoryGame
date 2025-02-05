<script lang="ts">
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';
    import CardBack from './lib/CardBack.svelte';

  // Create pairs of cards and shuffle them
  export let cards = shuffle(Array.from({ length: 12 }, (_, i) => [
    { id: i, flipped: false, matched: false, image: '' },
    { id: i, flipped: false, matched: false, image: '' }
  ]).flat());

  let flippedCards = [];
  let score = 0;
  let gameWon = false;

  onMount(async () => {
    await fetchPokemonImages();
  });

  async function fetchPokemonImages() {
    const promises = cards.map(async (card, index) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${card.id + 1}`);
      const data = await response.json();
      cards[index].image = data.sprites.front_default;
    });
    await Promise.all(promises);
    cards = shuffle(cards);
  }

  function flipCard(index: number) {
    const card = cards[index];
    if (card && !card.flipped && !card.matched && flippedCards.length < 2) {
      card.flipped = true;
      flippedCards.push(card);
      cards = [...cards];

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.id === card2.id) {
      card1.matched = true;
      card2.matched = true;
      score += 1;
      flippedCards = [];
      checkForWin();
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        flippedCards = [];
        cards = [...cards];
      }, 1000); // Flip back after 1 second
    }
  }

  function checkForWin() {
    if (cards.every(card => card.matched)) {
      gameWon = true;
      launchConfetti();
    }
  }

  function launchConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
</script>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* Adjusted to fit 24 cards */
    gap: 5px;
  }
  .card {
    width: 150px;
    height: 150px;
    perspective: 1000px;
    padding: 1rem;
    font-size: 0;
    line-height: 0;
    cursor: pointer;
  }
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
  }
  .card-front {
    color: black;
  }
  .card-back {
    background-color: white;
    color: white;
    transform: rotateY(180deg);
  }
  .card-back img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div>
  <p>Score: {score}</p>
  {#if gameWon}
  <p>You won!</p>
  {/if}
</div>

<div class="grid">
  {#each cards as card, index}
  <div class="card" class:flipped={card.flipped} on:click={() => flipCard(index)}>
    <div class="card-inner">
    <div class="card-front">
      <CardBack />
    </div>
    <div class="card-back">
      {#if card.image}
      <img src={card.image} alt="Pokemon">
      {/if}
    </div>
    </div>
  </div>
  {/each}
</div>