<script setup>
import { ref, onMounted, toRaw } from "vue"

const props = defineProps(["id"])

const utilisateur   = ref("");
const type          = ref("achats");
const listeArticles = ref([]);
const filtres       = ref([]);

onMounted(() => {
    getUSerById();
});

async function getUSerById() {
    const result = await axios.get(`utilisateurs/${props.id}`)
        .catch(function (error) {
            console.log(error.response);
        });
    utilisateur.value = result.data;
}

async function putUserById() {
    // TODO
}

async function loadArticles() {
    const selection = 0;
    console.log("Filtre", toRaw(filtres.value));

    switch (toRaw(filtres.value)) {
        case ["ventes_non_debutees"]:
            selection = 1;
            break;
        case ["ventes_en_cours"]:
            selection = 2;
            break;
        case ["ventes_terminees"]:
            selection = 3;
            break;
    }
    console.log("Checkbox", filtres);
    console.log("Selection", selection);

    console.log("url", `articles/select/${selection}`);
    // const result = await axios.get(`articles/select/${selection}`)
    //         .catch(function (error) {
    //         console.log(error.response);
    //     });
    // listeArticles.value = result.data;
    console.log("Liste Articles", listeArticles);
}

</script>

<template>
    <div class="container-md w-75 text-center profil">

        <h2 class="mt-3 mb-3">Mon profil</h2>

        <div v-if="utilisateur">
            <div class="card" style="width: 25rem;">
                <img :src="utilisateur.image" class="card-img-top" :alt="utilisateur.pseudo">
                <div class="card-body">
                    <h5 class="card-title">{{ utilisateur.pseudo }}</h5>
                    <p class="card-text">
                    <div class="mb-3"><span class="text-secondary">Nom : </span> {{ utilisateur.nom }}</div>
                    <div class="mb-3"><span class="text-secondary">Prénom : </span> {{ utilisateur.prenom }}</div>
                    <div class="mb-3"><span class="text-secondary">Email : </span> {{ utilisateur.email }}</div>
                    <div class="mb-3"><span class="text-secondary">Téléphone : </span> {{ utilisateur.telephone }}</div>
                    <div class="mb-3"><span class="text-secondary">Rue : </span> {{ utilisateur.rue }}</div>
                    <div class="mb-3"><span class="text-secondary">Code postal : </span> {{ utilisateur.codePostal }}</div>
                    <div class="mb-3"><span class="text-secondary">Ville : </span> {{ utilisateur.ville }}</div>
                    <div class="mb-3"><span class="text-secondary">Crédit : {{ utilisateur.credit }}</span></div>
                    </p>

                    <!-- <a href="/modif_profil"> <input type="submit" value="Modifier" class="btn btn-primary" />
                    </a> -->
                    <input type="submit" value="Modifier" class="btn btn-primary" @click="putUserById"/>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-around w-50 pb-4">
            <!-- SELECTION DES ACHATS -->
            <div>
                <div>
                    <input type="radio" id="achats" value="achats" v-model="type" @click="loadArticles" />
                    <label for="achats">Achats</label>
                </div>

                <div class="ms-5">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="encheres_ouvertes" id="encheres_ouvertes"
                            v-model="filtres" :disabled="type == 'ventes'" />
                        <label class="form-check-label" for="encheres_ouvertes">
                            Mes enchères ouvertes
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="encheres_en_cours" id="encheres_en_cours"
                            v-model="filtres" :disabled="type == 'ventes'" />
                        <label class="form-check-label" for="encheres_en_cours">
                            Mes enchères en cours
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="encheres_remporte" id="encheres_remporte"
                            v-model="filtres" :disabled="type == 'ventes'" />
                        <label class="form-check-label" for="encheres_remporte">
                            Mes enchères remportées
                        </label>
                    </div>
                </div>
            </div>

            <!-- SELECTION DES VENTES -->
            <div>
                <div>
                    <!-- v-model le même entre achat et vente -->
                    <input type="radio" id="ventes" value="ventes" v-model="type" />
                    <label for="ventes">Mes Ventes</label>
                </div>

                <div class="ms-5">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="ventes_non_debutees" id="ventes_non_debutees"
                            v-model="filtres" @change="loadArticles" :disabled="type == 'achats'" />
                        <label class="form-check-label" for="ventes_non_debutees">
                            Mes ventes non débutées
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="ventes_en_cours" id="ventes_en_cours"
                            v-model="filtres" @change="loadArticles" :disabled="type == 'achats'" />
                        <label class="form-check-label" for="ventes_en_cours">
                            Mes ventes en cours
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="ventes_terminees" id="ventes_terminees"
                            v-model="filtres" @change="loadArticles" :disabled="type == 'achats'" />
                        <label class="form-check-label" for="ventes_terminees">
                            Mes ventes terminées
                        </label>
                    </div>
                </div>
            </div>

        </div>

        <p>{{filtres}}</p>
        <!-- Affichage liste article -->
        <div class="d-flex justify-content-around">
            <div v-for="article in listeArticles" :key="article.id">
                <div class="card" style="width: 18rem">
                    <div class="card-body">
                        <!-- <img class="card-img-top" :src="article.image_article" :alt="article.nomArticle"> -->
                        <h5 class="card-title mt-2">{{ article.nomArticle }}</h5>
                        <div>Description : {{ article.description }}</div>
                        <!-- <div>Meilleure offre : {{ article.enchere.montantEnchere }}</div> -->
                        <div>Mise à prix : {{ article.prixInitial }}</div>
                        <div>Début de l'enchère : {{ article.dateDebutEncheres }}</div>
                        <div>Fin de l'enchère : {{ article.dateFinEncheres }}</div>
                        <div>Retrait : {{ article.retrait }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.profil {
    display: grid;
    justify-content: center;
}
.card {
    margin-bottom: 2rem;
}

.session {
    margin-top: 2rem;
}
</style>