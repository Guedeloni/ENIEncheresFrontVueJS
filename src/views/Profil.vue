<script setup>
import { ref, onMounted } from "vue"
import ModalProfilVue from "../components/modal/ModalProfil.vue"

const props = defineProps(
    [
        "id",
        "pseudo",
        "nom",
        "prenom",
        "email",
        "telephone",
        "rue",
        "codePostal",
        "ville",
        "credit",
        "avatar"
    ])

const utilisateur = ref("");

// REF => checkbox
const type = ref("achats");
const filtres = ref([]);

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
    modifierProfil();
});

// ************* USER BY ID ************* //

async function getUSerById() {
    const result = await axios.get(`utilisateurs/${props.id}`)
        .catch(function (error) {
            console.log(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage.value = error.response.data.message;
            }
        });

    // console.log("profil user", result)
    utilisateur.value = result.data;
}

function recharger() {
    filtres.value = [];
}

// ************* MODIFIER ************* //

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
                    <div class="mb-3"><span class="text-secondary">Nom :</span> {{ utilisateur.nom }}</div>
                    <div class="mb-3"><span class="text-secondary">Prénom :</span> {{ utilisateur.prenom }}</div>
                    <div class="mb-3"><span class="text-secondary">Email :</span> {{ utilisateur.email }}</div>
                    <div class="mb-3"><span class="text-secondary">Telèphone :</span> {{ utilisateur.telephone }}</div>
                    <div class="mb-3"><span class="text-secondary">Rue :</span> {{ utilisateur.rue }}</div>
                    <div class="mb-3"><span class="text-secondary">Code postal :</span> {{ utilisateur.code_postal }}
                    </div>
                    <div class="mb-3"><span class="text-secondary">Ville :</span> {{ utilisateur.ville }}</div>
                    <div class="mb-3"><span class="text-secondary">Crédit: {{ utilisateur.credit }}</span></div>
                    </p>

                    <button type="buttton" class="btn btn-primary" @click="showModal">Modifier</button>

                </div>
            </div>

            <!-- ********************* MODAL pour modifier le profil  ********************* -->
            <!--   v-bind="utilisateur" permet de récupérer toutes les props -->
            <ModalProfilVue 
                v-bind="utilisateur" 
                :show="modalVisible" 
                :closeModal="closeModal"
                :modifier-profil="modifierProfil" 
            />
        </div>

        <div class="d-flex justify-content-around w-50 pb-4">
            <div>
                <div>
                    <input type="radio" id="achats" value="achats" v-model="type" @click="recharger" />
                    <label for="achats">Achats</label>
                </div>

                <div class="ms-5">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="encheres_ouvertes" id="encheres_ouvertes"
                            v-model="filtres" :disabled="type == 'ventes'" />
                        <label class="form-check-label" for="encheres_ouvertes">
                            enchères ouvertes
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

            <div>
                <div>
                    <!-- v-model le même entre achat et vente -->
                    <input type="radio" id="ventes" value="ventes" v-model="type" @click="recharger" />
                    <label for="ventes">Mes Ventes</label>
                </div>

                <div class="ms-5">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="ventes_en_cours" id="ventes_en_cours"
                            v-model="filtres" :disabled="type == 'achats'" />
                        <label class="form-check-label" for="ventes_en_cours">
                            mes ventes en cours
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="ventes_non_debute" id="ventes_non_debute"
                            v-model="filtres" :disabled="type == 'achats'" />
                        <label class="form-check-label" for="ventes_non_debute">
                            ventes non débutées
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="ventes_termine" id="ventes_termine"
                            v-model="filtres" :disabled="type == 'achats'" />
                        <label class="form-check-label" for="ventes_termine">
                            ventes terminées
                        </label>
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