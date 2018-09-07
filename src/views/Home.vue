<template>
  <div>
    <div class="flex w-full justify-content mt-16 mb-4">
      <h1 class="w-full text-center">Tic Tac Toe</h1>
    </div>
    <div class="flex w-full">
      <div class="flex flex-wrap w-full md:w-3/4 pr-0 md:pr-4">
        <div class="w-full rounded cursor-pointer mb-4"
             v-for="(room, key) in rooms"
             :key="key"
             @click="join(room.id)"
        >
          <div class="overflow-hidden shadow-md">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Room: {{ room.name }}</div>
              <p class="text-grey-darker text-base">
                Create by: {{ room.playerOne }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-full md:w-1/4 justify-center">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              @submit.prevent="createRoom"
        >
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2"
                   for="room-name">
              Room Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                   id="room-name"
                   type="text"
                   placeholder="Room name here"
                   v-model="form.roomName"
            />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit">
              Save
            </button>
          </div>
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
      },
    };
  },
  firestore() {
    return {
      rooms: window.db
        .collection('rooms')
        .orderBy('timestamp', 'desc'),
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
        .doc(this.form.roomName)
        .set({
          name: this.form.roomName,
          squares: Array(9).fill(null),
          numberOfRoom: 2,
          timestamp: window.firebase.firestore
            .FieldValue.serverTimestamp(),
        })
        .then(() => {
          window.swal({
            position: 'top-end',
            type: 'success',
            title: 'สร้างห้องเรียบร้อย',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          window.swal({
            position: 'top-end',
            type: 'error',
            title: 'สร้างห้องไม่ได้',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>
