<script setup>
defineProps({
  art: {
    type: Object,
    required: true
  },
  bestOffre: {
    type: Number,
    required: true
  }
})
</script>

<template>
    <img :src="art.imageURL" class="card-img-top cardDetail" :alt="art.nomArticle" />
    <h5 class="card-title mt-2">{{  art.nomArticle  }}</h5>
    <div v-if="art.categorie">Catégorie: {{  art.categorie.libelle  }}</div>
    <div>Description : {{  art.description  }}</div>
    <div>Meilleure offre : {{  bestOffre  }} points</div>
    <div>Mise à prix : {{  art.prixInitial  }} points</div>
    <div>Fin de l'enchère : {{  art.dateFinEncheres  }}</div>
    <div v-if="art.retrait" class="retrait">
        <div>Retrait : {{  art.retrait.rue  }}</div>
        <p>{{  art.retrait.codePostal  }} - {{  art.retrait.ville  }}</p>
    </div>
    <div v-if="art.vendeur">Vendeur : {{  art.vendeur.pseudo  }}</div>
</template>