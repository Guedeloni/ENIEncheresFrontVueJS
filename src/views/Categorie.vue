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
  <div class="main-categorie">
    <h1>Categories</h1>
    <div class="categorie">

      <form method="post">
        <section class="form-element">
          <label for="libelle" class="libelle">Libelle : </label>
          <!-- v-model permet d associer input a la variable "libelle" de notre modèle-->

          <input id="libelle" type="text" v-model="libelle" />
          <!-- <span class="error">{{ libelle }}></span> -->
        </section>
        <!-- pour ne pas qu on valide le formulaire ne pas oublier type"button"-->
        <button type="button" class="btn-categorie" @click="addCategorie">Validation</button>
      </form>
      <p>{{  errorMessage  }}</p>

      <div class="card" style="width: 25rem">
        <div class="card-body">
          <h5 class="card-title mt-2">Liste des Catégories</h5>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Catégorie</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="categorie in listeCategorie" :key="categorie.id">
                <th scope="row">{{  categorie.noCategorie  }}</th>
                <td>{{  categorie.libelle  }}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.main-categorie {
  margin: 0 auto;
  text-align: center;
  width: 800px;
}

h1, .btn-categorie {
  margin-bottom: 2rem;
}

.categorie {
  display: grid;
  justify-content: center;
}

.libelle {
  margin-right: 5px;
}

form .form-element {
  margin-bottom: 10px;
}

form .form-element label {
  display: inline-block;
  width: 100px;
  text-align: right;
}

.btn-categorie {
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
</style>
