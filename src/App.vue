<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/Nav/Nav.vue'
import { ref, onMounted } from "vue";

const currentUser   = ref({});

onMounted(() => {
  loadCurrentUser();
});

async function loadCurrentUser() {
  const result = await axios.get("login")
                      // .then(response => {
                      //   console.log("currentUser", response.currentUser)
                      // })
                      .catch(function (error) {
                          console.log(error.response);
                          if (error.response && error.response.data && error.response.data.message) {
                            errorMessage.value = error.response.data.message;
                          }
                        });
  currentUser.value = result.data;
}

</script>

<template>
  <p>{{currentUser.pseudo}}</p>
  <Nav />
  <RouterView />
</template>

<style scoped>
</style>
