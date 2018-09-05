<template>
  <div
    @click="handleClick"
    class="h-24 p-4 border-solid border flex items-center cursor-pointer">
    <div class="flex-1 text-center text-3xl">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'Square',
  props: ['value'],
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>
