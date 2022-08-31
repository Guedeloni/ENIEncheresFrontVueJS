<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["id"]);

const article         = ref({});
const retrait         = ref("");
const utilisateur     = ref("");
const enchere         = ref("");
const dateEnchere     = ref("");
const montantEnchere  = ref();

const errorMessage    = ref();

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
  console.log("ENCHERELIST api", result.data.enchereList);

  article.value = result.data;
  enchereList.value = result.data.enchereList;
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
  const result = await axios
    .post(`encheres/${props.id}`, body)
    .catch(function (error) {
      console.log(error.response);
      if (error.response &&
        error.response.data &&
        error.response.data.message) {
        errorMessage.value = error.response.data.message;
      }

    });
  enchere.value = result.data;
}
</script>

<template>
  <div class="container">
    <h1>Details Vente</h1>

    <div class="detail">
      <div class="card" style="width: 25rem">
        <div class="card-body">
          <img :src="article.imageURL" class="card-img-top cardDetail" :alt="article.nomArticle" />
          <h5 class="card-title mt-2">{{  article.nomArticle  }}</h5>

          <!--  v-if car même si il est présent dans le GET   -->
          <!-- il est undefined ? pareil pour Retrait   -->
          <!-- et ça n'affiche plus la card donc TODO réussir à les afficher -->
          
          <div v-if="article.categorie">
            <div>Catégorie: {{  article.categorie.libelle  }}</div>
          </div>
          <div>Description : {{  article.description  }}</div>
          <div>Meilleure offre : {{  enchere.montantEnchere  }} €</div>
          <div>Mise à prix : {{  article.prixInitial  }} €</div>
          <div>Fin de l'enchère : {{  article.dateFinEncheres  }}</div>

          <!-- ********************* RETRAIT ************************* -->
          <div v-if="article.retrait">
            <div class="retrait">
              <div>Retrait : {{  article.retrait.rue  }}</div>
              <p>{{  article.retrait.codePostal  }} - {{  article.retrait.ville  }}</p>
            </div>
          </div>

          <!-- ****************************************************** -->

          <div v-if="article.vendeur">Vendeur : {{  article.vendeur.pseudo  }}</div>
          <div class="input-group">
            <input type="number" class="form-control" aria-label="Points amount (with dot and two decimal places)"
              v-model="montantEnchere" />
            <button type="button" @click="addEnchere">Encherir</button>
          </div>
          <p>{{  errorMessage  }}</p>
        </div>
      </div>

      <!-- ********************* Historique des enchères ************************* -->

      <div class="card" style="width: 25rem">
        <div class="card-body">
          <h5 class="card-title mt-2">Historique des enchères</h5>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date Enchère</th>
                <th scope="col">Montant Enchère</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="enchere in enchereList" :key="enchere.id">
                <th scope="row">{{  enchere.id  }}</th>
                <td>{{  enchere.dateEnchere  }}</td>
                <td>{{  enchere.montantEnchere  }} €</td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 2rem 0;
}

.detail {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.retrait {
  display: grid;
}
</style>
