<script setup>
import { ref, onMounted } from "vue";

// mise en place de variables

const libelle = ref("");
const listeCategorie = ref([]);
const errorMessage = ref("");

onMounted(() => {
  loadCategories();
});

//ajout des genre avec le post

async function addCategorie() {
  const body = {
    libelle: libelle.value,
  };

  await axios.post("categories", body)
  .catch(function (error) {
    console.log(error.response);
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message; // coresspond au message de la requet http
    }
  });

  loadCategories();
  libelle.value = "";
}

async function loadCategories() {
  const result = await axios.get("categories");

  listeCategorie.value = result.data;
}
</script>

<template>
  <main>
    <h1>Categories</h1>

    <form method="post">
      <section class="form-element">
        <label for="libelle">Libelle : </label>
        <!-- v-model permet d associer input a la variable "libelle" de notre modèle-->

        <input id="libelle" type="text" v-model="libelle" />
        <!-- <span class="error">{{ libelle }}></span> -->
      </section>
      <!-- pour ne pas qu on valide le formulaire ne pas oublier type"button"-->
      <button type="button" @click="addCategorie">Validation</button>
    </form>
    <p>{{ errorMessage }}</p>

    <h2>Liste des Catégories</h2>

    <!--pour faire un boucle on utilise <v-for>-->
    <ul>
      <li v-for="categorie in listeCategorie" v-bind:key="categorie.id">
        {{ categorie.libelle }}
      </li>
    </ul>
  </main>
</template>

<style>
nav {
  display: flex;
  align-items: center;
}

nav li {
  display: inline-block;
  margin: 20px;
}

nav section {
  display: flex;
  align-items: center;
}

nav section form {
  margin: 0;
}

nav section button,
.search-button {
  margin-left: 5px;
  font-size: 14px;
  padding: 5px;
}

form .form-element {
  margin-bottom: 10px;
}

form .form-element label {
  display: inline-block;
  width: 100px;
  text-align: right;
}

form button {
  border: none;
  padding: 7px;
  font-size: 16px;
  background-color: #16a085;
  color: white;
  margin-left: 100px;
}

.confirmation {
  color: green;
}

.commentaire {
  padding: 10px;
  background-color: lightgrey;
  font-style: italic;
  width: fit-content;
  margin-top: 5px;
}

.checkbox {
  color: green;
  text-align: center;
  font-weight: 800;
}

.error {
  color: red;
}

.table {
  border-collapse: collapse;
  border: 1px solid black;
}

.table thead tr {
  background-color: #16a085;
  color: white;
}

.table td,
.table th {
  border: 1px solid black;
  padding: 5px;
}
ul {
  list-style-type: none;
}
</style>
