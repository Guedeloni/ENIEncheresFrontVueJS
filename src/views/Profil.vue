<script setup>

import ModalProfilVue from "../components/modal/ModalProfil.vue"
import { ref, onMounted, toRaw } from "vue"


const props = defineProps(["id"])
const utilisateur   = ref("");

// REF => checkbox
const type          = ref("achats");
const listeArticles = ref([]);
const filtres       = ref([]);

// REF => modifier profil
const avatar = ref("")
const pseudo = ref("")
const nom = ref("")
const prenom = ref("")
const email = ref("")
const telephone = ref("")
const rue = ref("")
const codePostal = ref("")
const ville = ref("")
const newPassword = ref("")
const currentPassword = ref("")
const confirmPassword = ref("")

onMounted(() => {
    getUSerById();
    // modifierProfil();
});

// ************* USER BY ID ************* //
async function getUSerById() {
    const result = await axios.get(`utilisateurs/${props.id}`)
    .catch(function (error) {
            console.log(error.response);
        });
    utilisateur.value = result.data;
}

// ************* LOAD ARTICLES BY SELECTION ************* //
async function loadArticles() {
    let selection = 0;
    // Usine à gaz pour transformation des combinaisons possibles
    // de l'array de selection des boutons radio (R1, R2, R3)
    // en variable a transmettre a l'API pour selectionner l'attribut etatVente
    // (1 = "ventes_non_debutees", 2 = "ventes_en_cours", 3 = "ventes_terminees").
    // Pour le cas d'1 seul bouton radio selectionne (R1 => 1 ou R2 => 2 ou R3 => 3) :
    if (toRaw(filtres.value).length == 1)
        switch (toRaw(filtres.value)[0]) {
            case "ventes_non_debutees":
                selection = 1;
                break;
            case "ventes_en_cours":
                selection = 2;
                break;
            case "ventes_terminees":
                selection = 3;
                break;
        }
    // Pour le cas de 2 boutons radio selectionnes (R1R2/R2R1 => 12 ou R1R3/R3R1 => 13 ou R2R3/R3R2 => 23) :
    if (toRaw(filtres.value).length == 2) {
        if (toRaw(filtres.value)[0] == "ventes_non_debutees" || toRaw(filtres.value)[1] == "ventes_non_debutees") selection = 10;
        if (toRaw(filtres.value)[0] == "ventes_en_cours" || toRaw(filtres.value)[1] == "ventes_en_cours") {
            if (selection == 0) selection = 20;
            else selection = selection + 2;
        }
        if (toRaw(filtres.value)[0] == "ventes_terminees" || toRaw(filtres.value)[1] == "ventes_terminees") {
            selection = selection + 3;
        }
    }
    // Pour le cas des 3 boutons radio selectionnes (R1R2R3 => 123) :
    if (toRaw(filtres.value).length == 3) selection = 123;

    console.log("url", `articles/${props.id}/${selection}`);
    const result = await axios.get(`articles/${props.id}/${selection}`)
            .catch(function (error) {
            console.log(error.response);
        });
    listeArticles.value = result.data;
}

// ************* MODIFIER PROFIL ************* //
async function modifierProfil() {
    if (newPassword.value !== confirmPassword.value) {
        messageError.value = "mot de passe différent !"
        return null;
    }

    const body = {
        avatar: avatar.pseudo,
        pseudo: pseudo.value,
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        telephone: telephone.value,
        rue: rue.value,
        codePostal: codePostal.value,
        ville: ville.value,
        motDePasse: newPassword.value
    }

    const result = await axios.put(`utilisateurs/${props.id}`, body)
    console.log("modifier profil", result);
}

// ************* MODAL ************* //
const modalVisible = ref(false);
function showModal() {
    modalVisible.value = true;
}
function closeModal() {
    modalVisible.value = false;
}

</script>

<template>
    <div class="container-md w-75 text-center profil">

        <h2 class="mt-3 mb-3">Mon profil</h2>

        <div v-if="utilisateur">
            <div class="card" style="width: 25rem;">
                <img :src="utilisateur.avatar" class="card-img-top" :alt="utilisateur.pseudo">
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

                    <button type="button" class="btn btn-primary" @click="showModal">Modifier (non fonctionnel)</button>
                </div>
            </div>

            <!-- ********************* MODAL pour modifier le profil  ********************* -->
            <!--   v-bind="utilisateur" permet de récupérer toutes les props -->
            <ModalProfilVue 
                v-bind="utilisateur" 
                :show="modalVisible" 
                :closeModal="closeModal"
                :modifierProfil="modifierProfil" 
            />
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