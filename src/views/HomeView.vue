<script setup>
import { ref, onMounted } from "vue"; // data()

const type = ref("achats");
const filtres = ref([]);
const options = ref([]);
const listeArticles = ref([]);

onMounted(() => {
  // on délègue le traitement dans un autre méthode qui va être appelée également après l'ajout du genre
  loadArticles();
});

// faire un onclick mettre à zéro les ref
function recharger() {
  // faire un GET sur l' api
  filtres.value = [];
}

async function loadArticles() {
  // 1 - requête d'API avec axios pour recupérer les genres
  // (le prefixe "http://localhost:8080/api/") a déjà été défini dans main.js
  const result = await axios.get("articles");
  
  // 2- Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeArticles.value = result.data; // ne pas oublier .data (équivalent de data.json() avec fetch)
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
      <input
        type="search"
        class="form-control rounded"
        placeholder="le nom de l'article ..."
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="button" class="btn btn-outline-primary">Rechercher</button>
    </div>

    <div class="input-group mb-3 w-50 p-3">
      <label class="input-group-text" for="inputGroupSelect01"
        >Catégories</label
      >
      <select class="form-select" id="catégories" v-model="options">
        <div>
          <option disabled value="">Toutes</option>
          <div v-for="categorie in listeCategorie" :key="categorie.id">
            <option value="{{categorie.no_categorie}}">
              {{ categorie.libelle }}
            </option>
          </div>
        </div>
      </select>
    </div>

    <!-- si l'utilisateur est connecté on affiche les champs Achats et Ventes  -->
    <!-- TODO  -->
    <!-- <div v-if="utilisateur"> -->

    <div class="d-flex justify-content-around w-50 pb-4">
      <div>
        <div>
          <input
            type="radio"
            id="achats"
            value="achats"
            v-model="type"
            @click="recharger"
          />
          <label for="achats">Achats</label>
        </div>

        <div class="ms-5">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="encheres_ouvertes"
              id="encheres_ouvertes"
              v-model="filtres"
              :disabled="type == 'ventes'"
            />
            <label class="form-check-label" for="encheres_ouvertes">
              enchères ouvertes
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="encheres_en_cours"
              id="encheres_en_cours"
              v-model="filtres"
              :disabled="type == 'ventes'"
            />
            <label class="form-check-label" for="encheres_en_cours">
              Mes enchères en cours
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="encheres_remporte"
              id="encheres_remporte"
              v-model="filtres"
              :disabled="type == 'ventes'"
            />
            <label class="form-check-label" for="encheres_remporte">
              Mes enchères remportées
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <!-- v-model le même entre achat et vente -->
          <input
            type="radio"
            id="ventes"
            value="ventes"
            v-model="type"
            @click="recharger"
          />
          <label for="ventes">Mes Ventes</label>
        </div>

        <!-- <c:choose>
          <c:when test="${! empty utilisateur.pseudo}"> -->
        <div class="ms-5">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="ventes_en_cours"
              id="ventes_en_cours"
              v-model="filtres"
              :disabled="type == 'achats'"
            />
            <label class="form-check-label" for="ventes_en_cours">
              mes ventes en cours
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="ventes_non_debute"
              id="ventes_non_debute"
              v-model="filtres"
              :disabled="type == 'achats'"
            />
            <label class="form-check-label" for="ventes_non_debute">
              ventes non débutées
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="ventes_termine"
              id="ventes_termine"
              v-model="filtres"
              :disabled="type == 'achats'"
            />
            <label class="form-check-label" for="ventes_termine">
              ventes terminées
            </label>
          </div>
        </div>
        <!-- </c:when>
        </c:choose> -->
      </div>
    </div>
    <!-- </div> -->

    <!-- Affichage liste article -->
    <div class="d-flex justify-content-around">
      <div v-for="article in listeArticles" :key="article.id">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <!-- <img class="card-img-top" :src="article.image_article" :alt="article.nomArticle"> -->
            <h5 class="card-title mt-2">{{ article.nomArticle }}</h5>
            <div>Prix : {{ article.prixInitial }} points</div>
            <p class="card-text">
              Fin de l'enchère : {{ article.dateFinEncheres }}
            </p>

            <router-link :to="`/articles/${article.noArticle}`">Detail Article
            </router-link>

            <!-- TODO => créer un article avec un utilisateur pour pouvoir récupérer le pseudo sinon null -->
            <!-- <p class="card-text">Vendeur : {{ article.utilisateur.pseudo }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
