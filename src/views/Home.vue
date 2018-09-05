<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <h1>Test</h1>
    </div>
    <div class="flex flex-wrap w-full justify-center">
      <div class="flex flex-wrap w-4/5 md:w-1/3 mt-4">
        <form @submit.prevent="createRoom">
          <input placeholder="Room name" name="roomName" type="text" v-model="form.roomName" />
          <input placeholder="Player Name"
                 name="playerName"
                 type="text"
                 v-model="form.playerName" />
          <button type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      form: {
        roomName: '',
        playerName: '',
      },
    };
  },
  methods: {
    createRoom() {
      window.db
        .collection('rooms')
        .add({
          name: this.form.roomName,
          squares: Array(9).fill(null),
        }).then((response) => {
          this.$router.push({
            name: 'tic-tac-toe',
            params: {
              id: response.id,
            },
            query: {
              playerName: this.form.playerName,
            },
          });
        });
    },
  },
};
</script>
