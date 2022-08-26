<script setup>
import { ref, onMounted } from 'vue';

const listeUtilisateurs = ref([])

// TODO ROLES dans le BACKEND

onMounted(() => {
    // on délègue le traitement dans un autre méthode qui va être appelée également après l'ajout du genre
    getUSers();
})


async function getUSers() {
    const result = await axios.get("utilisateurs");

    listeUtilisateurs.value = result.data;
}

function deleteUser(id) {
    axios.delete("utilisateurs/" + id)
}

</script>
<template>
    <div class="d-flex justify-content-around">
        <div v-for="utilisateur in listeUtilisateurs" :key="utilisateur.id">

            <div class="card" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title mt-2">{{ utilisateur.pseudo }}</h5>
                    <form method="post">
                        <button type="button" class="btn-close" aria-label="Close" @click="deleteUser(utilisateur.id)"></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>