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
      <div class="w-4/5 md:w-1/3 mt-4">
        <div class="flex w-full">
          <square class="flex-1" @click="handleClick(0)" :value="room.squares[0]"></square>
          <square class="flex-1" @click="handleClick(1)" :value="room.squares[1]"></square>
          <square class="flex-1" @click="handleClick(2)" :value="room.squares[2]"></square>
        </div>
        <div class="flex w-full">
          <square class="flex-1" @click="handleClick(3)" :value="room.squares[3]"></square>
          <square class="flex-1" @click="handleClick(4)" :value="room.squares[4]"></square>
          <square class="flex-1" @click="handleClick(5)" :value="room.squares[5]"></square>
        </div>
        <div class="flex w-full">
          <square class="flex-1" @click="handleClick(6)" :value="room.squares[6]"></square>
          <square class="flex-1" @click="handleClick(7)" :value="room.squares[7]"></square>
          <square class="flex-1" @click="handleClick(8)" :value="room.squares[8]"></square>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full justify-center">
      <div class="flex flex-wrap w-4/5 md:w-1/3 mt-4">
        <button type="button" @click="reset">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tic-tac-toe',
  data() {
    return {
      winner: null,
      player: null,
      room: {
        squares: Array(9).fill(null),
        xIsNext: true,
        playerOne: null,
        playerTwo: null,
      },
    };
  },
  firestore() {
    return {
      room: window.db.collection('rooms')
        .doc(`/${this.$route.params.id}`),
    };
  },
  watch: {
    winner(data) {
      console.log(data, 'ssssssdfs');
      if (data) {
        window.swal('Alert!!!!!', `Winner is ${this.player} ${data}`, 'success');
      }
    },
  },
  methods: {
    handleClick(i) {
      if (this.calculateWinner() || this.room.squares[i]) {
        return;
      }
      console.log('before', this.room.xIsNext);
      const squares = this.room.squares.slice();
      squares[i] = this.room.xIsNext ? 'X' : 'O';
      this.room.xIsNext = !this.room.xIsNext;
      this.room.squares = squares;

      console.log('after', this.room.xIsNext);

      window.db.collection('rooms')
        .doc(`/${this.$route.params.id}`)
        .update({
          squares,
          xIsNext: this.room.xIsNext,
        });
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
        if (this.room.squares[a] &&
          this.room.squares[a] === this.room.squares[b] &&
          this.room.squares[a] === this.room.squares[c]) {
          this.winner = this.room.squares[a];
        }
      }

      return null;
    },
    reset() {
      window.db.collection('rooms')
        .doc(`/${this.$route.params.id}`)
        .update({
          squares: Array(9).fill(null),
          xIsNext: true,
        });
    },
  },
  mounted() {
    if (this.player === null) {
      if (this.room.playerOne === null) {
        window.db.collection('rooms')
          .doc(`/${this.$route.params.id}`)
          .update({
            playerOne: this.$route.query.playerName,
          });
      } else {
        window.db.collection('rooms')
          .doc(`/${this.$route.params.id}`)
          .update({
            playerTwo: this.$route.query.playerName,
          });
      }

      this.player = this.$route.query.playerName;
    }
  },
};
</script>
