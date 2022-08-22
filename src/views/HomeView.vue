<script setup>
import { ref } from 'vue'; // data()

const type = ref("achats");
const filtres = ref([]);
// faire un onclick mettre à zéro les ref
function recharger() {

  // faire un GET sur l' api
  filtres.value = []

}


</script>

<template>
  <div class="container-md">
    <div class="d-flex justify-content-center">
      <h1 class="mt-3">Liste des Enchères</h1>
    </div>

    <div class="w-50">
      <h4>Filtres:</h4>
    </div>
    <div class="input-group w-50 p-3">
      <input type="search" class="form-control rounded" placeholder="le nom de l'article ..." aria-label="Search"
        aria-describedby="search-addon" />
      <button type="button" class="btn btn-outline-primary">Rechercher</button>
    </div>

    <div class="input-group mb-3 w-50 p-3">
      <label class="input-group-text" for="inputGroupSelect01">Catégories</label>
      <select class="form-select" id="catégories">
        <!-- <c:if test="${ ! empty listeCategorie }"> -->
        <option selected>Toutes</option>
        <c:forEach var="categorie" items="${ listeCategorie }">
          <option value="${categorie.no_categorie }">${categorie.libelle }</option>
        </c:forEach>
        <!-- </c:if> -->
      </select>

    </div>


    <!-- TODO faire une fonction Javascript qui permettra de mettre en disabled les inputs selon
qu'on clique  sur Achats ou Mes Ventes car avec le Java ça rechargera à chaque fois la page  -->

    <!-- <c:if test="${! empty utilisateur.pseudo }"> -->

    <!-- si l'utilisateur est connecté on affiche les champs Achats et Ventes  -->

    <div class="d-flex justify-content-around w-50 pb-4">

      <div>
        <div>
          <input type="radio" id="achats" value="achats" v-model="type" @click="recharger" />
          <label for="achats">Achats</label>

        </div>

        <div class="ms-5">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="encheres_ouvertes" id="encheres_ouvertes"
              v-model="filtres" :disabled="type == 'ventes'">
            <label class="form-check-label" for="encheres_ouvertes">
              enchères ouvertes </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="encheres_en_cours" id="encheres_en_cours"
              v-model="filtres" :disabled="type == 'ventes'"> <label class="form-check-label" for="encheres_en_cours">
              Mes
              enchères en cours </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="encheres_remporte" id="encheres_remporte"
              v-model="filtres" :disabled="type == 'ventes'"> <label class="form-check-label" for="encheres_remporte">
              Mes
              enchères remportées </label>
          </div>
        </div>
      </div>

 <div>{{ filtres }}</div>
      <div>
        <div>
          <!-- v-model le même entre achat et vente -->
          <input type="radio" id="ventes" value="ventes" v-model="type" @click="recharger" />
          <label for="ventes">Mes Ventes</label>
        </div>

        <!-- <c:choose>
          <c:when test="${! empty utilisateur.pseudo}"> -->
        <div class="ms-5">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="ventes_en_cours" id="ventes_en_cours"
              v-model="filtres" :disabled="type == 'achats'">
            <label class="form-check-label" for="ventes_en_cours">
              mes ventes en cours </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="ventes_non_debute" id="ventes_non_debute"
              v-model="filtres" :disabled="type == 'achats'">
            <label class="form-check-label" for="ventes_non_debute">
              ventes non débutées </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="ventes_termine" id="ventes_termine" v-model="filtres"
              :disabled="type == 'achats'">
            <label class="form-check-label" for="ventes_termine"> ventes
              terminées </label>
          </div>
        </div>
        <!-- </c:when>
        </c:choose> -->
      </div>
    </div>

    <div class="d-flex justify-content-around">
      <div v-if="article">
        <div v-for="article in listeArticles" :key="article.id">

        </div>
        <div class="card" style="width: 18rem;">
          <div class="card-body ">

            <img class="card-img-top" :src="article.image_article" :alt="article.nom_article">
            <h5 class="card-title mt-2">{{ article.nom_article }}</h5>
            <div>Prix : {{ article.prix_initial }} points</div>
            <p class="card-text">Fin de l'enchère :
              {{ article.date_fin_encheres }}</p>

            <!-- TODO => créer un article avec un utilisateur pour puvoir récupérer le pseudo sinon null -->
            <p class="card-text">Vendeur : {{ article.utilisateur.pseudo }}</p>

          </div>
        </div>
      </div>



    </div>

  </div>
</template>
