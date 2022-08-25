<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["id"]);

const article = ref({});
const retrait = ref("");
const utilisateur = ref("");

onMounted(() => {
  loadArticles();
});

async function loadArticles() {
  //   const result = await axios.get(`articles/${id}`);
  const result = await axios.get(`articles/${props.id}`);
  //const result = await axios.get("articles/" + id);
  console.log("articles api", result);

  article.value = result.data;
}
</script>

<template>
  <h1>Details Ventes</h1>
  <div class="card" style="width: 500rem; height: 18rem">
    <div class="card-body">
      <h5 class="card-title mt-2">{{ article.nomArticle }}</h5>
      <div>Description : {{ article.description }}</div>

      <div>Mise à prix : {{ article.prixInitial }}</div>
      <div>Fin de l'enchère : {{ article.dateFinEncheres }}</div>
      <div>Retrait : {{ article.retrait }}</div>
      <div v-if="article.vendeur">Vendeur : {{ article.vendeur.pseudo }}</div>

      <div></div>
    </div>
  </div>
</template>
