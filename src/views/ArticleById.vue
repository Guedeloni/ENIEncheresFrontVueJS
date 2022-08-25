<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["id"]);

const article = ref({});
const retrait = ref("");
const utilisateur = ref("");
const enchere = ref("");
const dateEnchere = ref("");
const montantEnchere = ref();

onMounted(() => {
  loadArticles();
  loadEnchere();
});

async function loadArticles() {
  const result = await axios.get(`articles/${props.id}`);

  console.log("articles api", result);

  article.value = result.data;
}

async function loadEnchere() {
  const result = await axios.get(`encheres/${props.id}`);

  console.log("encheress api", result);

  enchere.value = result.data;
  
}

async function addEnchere() {
  const body = {
    Dateenchere: dateEnchere.value,
    montantEnchere: montantEnchere.value,
  };
  const result = await axios
    .post(`encheres/${props.id}`, body)
    .catch(function (error) {
      console.log(error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage.value = error.response.data.message;
      }
    });

  //    enchere.value = result.data;
}
</script>

<template>
  <h1>Details Vente</h1>
  <div class="card" style="width: 50rem; height: 18rem">
    <div class="card-body">
      <h5 class="card-title mt-2">{{ article.nomArticle }}</h5>
      <div>Description : {{ article.description }}</div>
      <div>Meilleur offre :{{ enchere.montantEnchere }}</div>

      <div>Mise à prix : {{ article.prixInitial }}</div>
      <div>Fin de l'enchère : {{ article.dateFinEncheres }}</div>
      <div>Retrait : {{ article.retrait }}</div>
      <div v-if="article.vendeur">Vendeur : {{ article.vendeur.pseudo }}</div>
      <div class="input-group">
        <input
          type="number"
          class="form-control"
          aria-label="Points amount (with dot and two decimal places)"
          v-model="montantEnchere"
        />
        <span class="input-group-text"> Proposition pts</span>

        <button type="button" @click="addEnchere">Encherir</button>
      </div>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>
