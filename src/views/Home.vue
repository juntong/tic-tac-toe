<template>
  <div>
    <div class="flex w-full justify-content mt-16">
      <h1 class="w-full text-center">Tic Tac Toe</h1>
    </div>
    <div class="flex flex-wrap w-full mt-4">
      <div class="w-full md:w-2/4 lg:w-1/3 rounded cursor-pointer"
           v-for="(room, key) in rooms"
           :key="key"
           @click="join(room.id)"
      >
        <div class="rounded overflow-hidden shadow-lg p-1">
          <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Room: {{ room.name }}</div>
            <p class="text-grey-darker text-base">
              Create by: {{ room.playerOne }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full justify-center">
      <div class="flex flex-wrap w-4/5 md:w-1/3 mt-4">
        <form @submit.prevent="createRoom">
          <input placeholder="Room name"
                 name="roomName"
                 class="input-text"
                 type="text"
                 v-model="form.roomName" />
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
      rooms: [],
      form: {
        roomName: '',
        playerName: '',
      },
    };
  },
  firestore() {
    return {
      rooms: window.db
        .collection('rooms'),
    };
  },
  methods: {
    join(id) {
      window.swal({
        title: 'Submit your name',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Let\'s go...',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          if (name !== null || name !== '') {
            return name;
          }

          return null;
        },
        allowOutsideClick: false,
      })
        .then((result) => {
          if (result.value) {
            this.$router.push({
              name: 'tic-tac-toe',
              params: {
                id,
              },
              query: {
                playerName: result.value,
              },
            });
          }
        });
    },
    createRoom() {
      window.db
        .collection('rooms')
        .add({
          name: this.form.roomName,
          squares: Array(9).fill(null),
          numberOfRoom: 2,
          players: {
            observes: [],
            join: [],
          },
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
