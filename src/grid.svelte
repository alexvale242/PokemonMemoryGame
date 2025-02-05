<script>
  export let cards = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      position: i,
      flipped: false
  }));

  function moveCard(id, newPosition) {
      const card = cards.find(card => card.id === id);
      if (card) {
          card.position = newPosition;
          cards = [...cards];
      }
  }

  function flipCard(id) {
      const card = cards.find(card => card.id === id);
      if (card) {
          card.flipped = !card.flipped;
          cards = [...cards];
      }
  }
</script>

<style>
  .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
  }
  .card {
      width: 100px;
      height: 150px;
      perspective: 1000px;
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
  }
  .card-front {
      background-color: #bbb;
      color: black;
  }
  .card-back {
      background-color: #2980b9;
      color: white;
      transform: rotateY(180deg);
  }
</style>

<div class="grid">
  {#each cards as card}
    <div class="card" class:flipped={card.flipped} on:click={() => flipCard(card.id)} style:order={card.position}>
      <div class="card-inner">
        <div class="card-front">
          Front {card.id}
        </div>
        <div class="card-back">
          Back {card.id}
        </div>
      </div>
    </div>
  {/each}
</div>