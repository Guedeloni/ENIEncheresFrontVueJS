<script setup>
// export default {
//     name: "VenteArticle"
// }

import { onMounted, ref } from 'vue'
const nom_article       = ref("");
const description       = ref("");
const categorie         = ref();
const listeCategorie    = ref([]);
const photo_article     = ref("");
const prix_initial      = ref();
const date_debut        = ref("");
const date_fin          = ref("");
const rue               = ref("");
const code_postal       = ref("");
const ville             = ref("");

const errorMessage      = ref("");

onMounted(() => {
    loadCategorie();
})

async function loadCategorie() {
    const result = await axios.get("categories");
    listeCategorie.value = result.data;
}

async function addArticle() {
  
    const body = {
        nomArticle:         nom_article.value,
        description:        description.value,
        categorie:          categorie.value,
        imageURL:           photo_article.value,
        prixInitial:        prix_initial.value,
        dateDebutEncheres:  date_debut.value,
        dateFinEncheres:    date_fin.value,
        retrait:            {
            rue:        rue.value,
            codePostal: code_postal.value,
            ville:      ville.value,
        }
    }
    await axios.post("articles", body)
                .catch(function (error) {
                    console.log(error.response);
                    if (error.response && error.response.data && error.response.data.message) {
                        errorMessage.value = error.response.data.message;
                    }
                });
    this.$router.push("/")
}

</script>

<template>
    <div class="container-md">

        <h2>Nouvelle vente</h2>

        <form>

            <div class="d-flex justify-content-around align-items-center w-50 p-3">
                <div>

                    <!-- NOM -->
                    <div class="form-group">
                        <label for="article">Nom de l'article : </label>
                        <input type="text" class="form-control" id="article" aria-describedby="article" v-model="nom_article">
                    </div>

                    <!-- DESCRIPTION -->
                    <div class="mb-3">
                        <label for="description" class="form-label">Description : </label>
                        <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
                    </div>

                    <!-- CATEGORIES -->
                    <div class="input-group mb-3 p-3">
                        <label class="input-group-text" for="categories">Catégories</label>
                        <select class="form-select" id="categories" v-model="categorie">
                            <option v-for="categorie in listeCategorie" :value="categorie">{{categorie.libelle}}</option>
                        </select>
                    </div>

                    <!-- IMAGE -->
                    <div class="form-group mb-3">
                        <label for="photo_article">Lien vers image de l'article :</label>
                        <input type="text" class="form-control" id="photo_article" v-model="photo_article">
                    </div>

                    <!-- MISE A PRIX -->
                    <div class="form-group mb-3">
                        <label for="prix_initial">Mise à prix : </label>
                        <input type="number" class="form-control" id="prix_initial" v-model="prix_initial"/>
                    </div>

                    <!-- DATE DEBUT ENCHERE-->
                    <div class="form-group mb-3">
                        <label for="date_debut">Début de l'enchère : </label>
                        <input type="date" class="form-control" id="date_debut" v-model="date_debut"/>
                    </div>

                    <!-- DATE FIN ENCHERE-->
                    <div class="form-group mb-3">
                        <label for="date_fin">Fin de l'enchère : </label>
                        <input type="date" class="form-control" id="date_fin" v-model="date_fin"/>
                    </div>

                    <!-- RETRAIT -->
                    <div>
                        <h3>Retrait</h3>
                        <div class="form-group mb-3">
                            <label for="rue">Rue : </label>
                            <input type="text" class="form-control" id="rue" aria-describedby="rue"
                                v-model="rue"/>
                        </div>
                        <div class="form-group mb-3">
                            <label for="code_postal">Code postal : </label>
                            <input type="text" class="form-control" id="code_postal" aria-describedby="code_postal"
                                v-model="code_postal"/>
                        </div>
                        <div class="form-group mb-3">
                            <label for="ville">Ville : </label>
                            <input type="text" class="form-control" id="ville" aria-describedby="ville"
                                v-model="ville"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-around w-25 mt-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="addArticle">Enregistrer</button>
                </div>
                <div>
                    <a href="/">
                        <button type="button" class="btn btn-primary">Annuler</button>
                    </a>
                </div>
            </div>

        </form>

        <p>{{ errorMessage }}</p>

    </div>
</template>

<style scoped>
</style>