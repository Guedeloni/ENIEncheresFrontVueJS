<script setup>
  import { ref, onMounted } from "vue";
  import DetailArticle from "../components/DetailArticle.vue";

  const props           = defineProps(["id"]);

  const article         = ref({});
  const enchereList     = ref();
  const enchere         = ref("");
  const dateEnchere     = ref("");
  const montantEnchere  = ref();
  const meilleureOffre  = ref();

  const errorMessage    = ref("");

  onMounted(() => {
    loadArticles();
  });

  async function loadArticles() {
    // Recuperation des donnees de l'article
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

    // Recuperation meilleure offre
    const resultEnchere = await axios.get(`encheres/${props.id}`)
      .catch(function (error) {
        console.log(error.response);
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage.value = error.response.data.message;
        }
      });
    meilleureOffre.value = resultEnchere.data.montantEnchere;

    // Remise a blanc du champ d'encherissement
    // montantEnchere = "";
    
    // Remise a blanc du message d'erreur
    errorMessage.value = "";
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
    loadArticles();
  }
  </script>
  
  <template>
    <div class="container">
      <h1>Details Vente</h1>
  
      <div class="detail">
        <div class="card" style="width: 25rem">
          <div class="card-body">
            <!-- ********************* Affichage details de l'article ************************* -->
            <DetailArticle
              :art="article"
              :bestOffre="meilleureOffre"
            />

            <!-- ********************* Affichage donnee d encherissement ************************* -->
            <div class="input-group">
              <input type="number" class="form-control" aria-label="Points amount (with dot and two decimal places)"
                v-model="montantEnchere" />
              <button type="button" @click="addEnchere">Encherir</button>
            </div>
            <p>{{  errorMessage  }}</p>
          </div>
        </div>
  
        <!-- ********************* Affichage historique des enchères ************************* -->
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
                  <td>{{  enchere.montantEnchere  }} points</td>
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