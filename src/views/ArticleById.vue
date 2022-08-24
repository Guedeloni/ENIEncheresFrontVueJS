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

  article.value = result.data; // ne pas oublier .data (équivalent de data.json() avec fetch)
}
</script>

<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title mt-2">{{ article.nomArticle }}</h5>
      <div>Description : {{ article.description }}</div>

      <div>Mise à prix : {{ article.prixInitial }}</div>
      <div>Fin de l'enchère : {{ article.dateFinEncheres }}</div>
      <div>Retrait : {{ article.retrait }}</div>
      <!---<div>Vendeur : {{ Utilisateur.vendeur }}</div>-->

      <div></div>
    </div>
  </div>
</template>
