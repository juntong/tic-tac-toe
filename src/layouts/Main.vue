<template>
  <div class="font-sans w-full max-w-screen-xl mx-auto">
    <nav class="bg-blue-lighter sticky pin-t py-2">
      <div class="flex items-stretch justify-between container mx-auto">
        <div class="self-center">
          <ul class="list-reset pl-4">
            <li class="">Home</li>
          </ul>
        </div>
        <div class="w-2/5">
          <input name="search"
                 placeholder="Search order here"
                 type="text"
                 class="search-txt"
          />
        </div>
        <div class="self-center hidden sm:block pr-4">
          <ul class="list-reset flex w-auto">
            <li class="pr-4">Notification</li>
            <li class="">Avatar</li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mx-auto">
      <div class="pt-4 bg-white min-h-screen">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style lang="postcss" scoped>
  .search-txt {
    @apply shadow appearance-none w-full rounded
      px-2 py-3 border-transparent bg-grey-light
      ;
  }

  .search-txt:focus {
    @apply bg-white
  }
</style>
