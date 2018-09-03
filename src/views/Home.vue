<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <h1 class="w-full text-center">
        Next player: {{ player }}
      </h1>
      <h2 class="w-full text-center mt-4">
        Winner: {{ calculateWinner() }}
      </h2>
    </div>
    <div class="flex flex-wrap w-full justify-center">
      <div class="flex flex-wrap w-1/3 mt-4">
        <square @click="handleClick(0)" :value="squares[0]"></square>
        <square @click="handleClick(1)" :value="squares[1]"></square>
        <square @click="handleClick(2)" :value="squares[2]"></square>
        <square @click="handleClick(3)" :value="squares[3]"></square>
        <square @click="handleClick(4)" :value="squares[4]"></square>
        <square @click="handleClick(5)" :value="squares[5]"></square>
        <square @click="handleClick(6)" :value="squares[6]"></square>
        <square @click="handleClick(7)" :value="squares[7]"></square>
        <square @click="handleClick(8)" :value="squares[8]"></square>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  },
  computed: {
    player() {
      return this.xIsNext ? 'X' : 'O';
    },
  },
  methods: {
    handleClick(i) {
      if (this.calculateWinner() || this.squares[i]) {
        return;
      }

      const squares = this.squares.slice();
      squares[i] = this.xIsNext ? 'X' : 'O';
      this.xIsNext = !this.xIsNext;
      this.squares = squares;
    },
    calculateWinner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c]) {
          return this.squares[a];
        }
      }

      return null;
    },
  },
};
</script>
