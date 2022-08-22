<script>
export default {
  name: "NotFound",
  methods: {
    home() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<template>
  <h2>404</h2>
  <p>Cette page n'existe pas, mauvaise url</p>
  <div><button @click="home()">Home</button></div>
</template>

<style>
</style>