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
        <button
          class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button" @click="reset">
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
      type: null,
      room: {
        squares: Array(9).fill(null),
        xIsNext: true,
        players: {
          join: [],
          observes: [],
        },
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
      if (data) {
        window.swal('Alert!!!!!', `Winner is ${this.player} ${data}`, 'success');
      }
    },
  },
  methods: {
    handleClick(i) {
      const currentType = this.room.xIsNext ? 'X' : 'O';
      if (this.type === null) {
        this.type = currentType;
      }

      if (this.calculateWinner() || this.room.squares[i]) {
        return;
      }

      if (this.type !== currentType) {
        return window.swal('Alert !!!!', 'อย่าโกงดิเห้ย...', 'error');
      }

      const squares = this.room.squares.slice();
      squares[i] = this.room.xIsNext ? 'X' : 'O';

      if (this.type === null) {
        this.type = squares[i];
      }

      this.room.xIsNext = !this.room.xIsNext;
      this.room.squares = squares;

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
          this.winner = this.room.squares[a] === this.type ? 'คุณชนะ' : 'ว๊ายยยยแพ้้้....';

          return this.room.squares[a];
        }
      }

      return null;
    },
    reset() {
      this.type = null;

      window.db.collection('rooms')
        .doc(`/${this.$route.params.id}`)
        .update({
          squares: Array(9).fill(null),
          xIsNext: true,
        });
    },
  },
  mounted() {
    if (this.room.players.join.length < 2) {
      console.log('join....');
      const playersJoin = this.room.players.join;
      this.player = this.$route.query.playerName;
      playersJoin.push([
        {
          name: this.players,
          type: null,
        },
      ]);

      window.db.collection('rooms')
        .doc(`/${this.$route.params.id}`)
        .update({
          players: {
            join: playersJoin,
          },
        });
    }
  },
};
</script>
