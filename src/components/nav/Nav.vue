<script setup>

import { ref, onMounted } from "vue";

const currentUser = ref({});
onMounted(() => {
  loadCurrentUser();
});

async function loadCurrentUser() {
  const result = await axios.get("login")
    .catch(function (error) {
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message;
      }
    });
  currentUser.value = result.data;
}

function deconnexion() {
  localStorage.clear();
}

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand" href="/">Eni-Enchères</a>

      <!-- burger menu -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!--  Si l' utilisateur n'est pas connecté, affichage INSCRIPTION/SE DECONNECTER  -->
      <div v-if="!currentUser.pseudo">

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/inscription">S'inscrire</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Se connecter</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Si l' utilisateur est connecté, affichage ACTIONS POSSIBLES + MON PROFIL + DECONNEXION  -->
      <div v-if="currentUser.pseudo">

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <a class="nav-link" href="vente-article">Vendre un article</a>
            </li>

            <!-- Si l' utilisateur est ADMIN, affichage gestion CATEGORIES + USERS  -->
            <div v-if="currentUser.admin">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/categories">Categories</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/admin">Admin</a>
              </li>
            </div>

            <!------------------------------------->

            <li class="nav-item">
              <!-- <a class="nav-link active" aria-current="page" href="/profil"> -->
                <!-- Mon profil <span class="login">{{currentUser.pseudo}}</span> -->
              <a class="nav-link active" aria-current="page" href="/">
                Connecté : <span class="login">{{currentUser.pseudo}}</span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/" @click="deconnexion">Déconnexion</a>
            </li>

          </ul>
        </div>

      </div>

    </div>
  </nav>
</template>

<style scoped>
.login {
  color: green
}
</style>
