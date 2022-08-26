<script setup>
import { ref, onMounted } from "vue";
// import { useRouter }      from 'vue-router';

const props = defineProps(["id"]);

const article         = ref({});
const retrait         = ref("");
const utilisateur     = ref("");
const enchere         = ref("");
const dateEnchere     = ref("");
const montantEnchere  = ref();

const errorMessage    = ref();
// const router          = useRouter();

onMounted(() => {
  loadArticles();
  loadEnchere();
});

async function loadArticles() {
  const result = await axios.get(`articles/${props.id}`)
    .catch(function (error) {
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message;
      }
    });
  console.log("articles api", result);
  article.value = result.data;
  montantEnchere = "";
}

async function loadEnchere() {
  const result = await axios.get(`encheres/${props.id}`);
  console.log("encheres api", result);
  enchere.value = result.data;
}

async function addEnchere() {
  const body = {
    Dateenchere: dateEnchere.value,
    montantEnchere: montantEnchere.value,
  };
  await axios
    .post(`encheres/${props.id}`, body)
    .then(response => {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error.response);
      if (error.response &&
          error.response.data &&
          error.response.data.message) {
        errorMessage.value = error.response.data.message;
      }
    });
}
</script>

<template>
  <h1>Details Vente</h1>
  <div class="card" style="width: 50rem; height: 18rem">
    <div class="card-body">
      <h5 class="card-title mt-2">{{ article.nomArticle }}</h5>
      <div>Description : {{ article.description }}</div>
      <div>Meilleure offre : {{ enchere.montantEnchere }}</div>
      <div>Mise à prix : {{ article.prixInitial }}</div>
      <div>Fin de l'enchère : {{ article.dateFinEncheres }}</div>
      <div>Retrait : {{ article.retrait }}</div>
      <div v-if="article.vendeur">Vendeur : {{ article.vendeur.pseudo }}</div>
      <div class="input-group">
        <input type="number" class="form-control" aria-label="Points amount (with dot and two decimal places)"
          v-model="montantEnchere"/>
        <button type="button" @click="addEnchere">Encherir</button>
      </div>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>
