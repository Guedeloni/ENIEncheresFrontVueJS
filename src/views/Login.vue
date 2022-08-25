<script setup>
import { ref } from 'vue'

const pseudo = ref("")

const password = ref("")
const messageConfirmation = ref("")

async function login() {
    // le corps de notre requête HTTP (format JSON)
    const body = {
        pseudo: pseudo.value,
        motDePasse: password.value
    }
    // On envoie une requête POST sur l'url BASE_URL + “login" avec les données définies plus haut
    const result = await axios.post("login", body);
    console.log(result);

    localStorage.setItem('jwt', result.data);

    // vider les inputs
    pseudo.value = ""
    password.value = ""

    messageConfirmation.value = "Vous êtes bien connecté"
}

</script>

<template>
    <div class="container-md">

        <div><span>{{messageConfirmation}}</span></div>
        <div><span>{{pseudo}}</span></div>

        <form method="post" action="">
            <div class="form-group w-25">
                <label for="pseudo">Identifiant</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="pseudo" 
                    name="pseudoInput" 
                    aria-describedby="pseudo"
                    placeholder="NineJea" 
                    v-model="pseudo"
                >
            </div>

            <div class="form-group w-25 mt-3">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="motDePasse" 
                    name="mdpInput" 
                    placeholder="Password"
                    v-model="password"
                >
            </div>

            <div class="d-flex justify-content-around w-25 mt-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="login">Connexion</button>
                </div>

                <div class="form-check d-grid">

                    <div>
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Se
                            souvenir de moi</label>
                    </div>

                    <a href="/mdp-oublie"> <small id="mdp-oublie" class="form-text text-muted">Mot de
                            passe oublié</small>
                    </a>
                </div>
            </div>

        </form>
        <div>

            <a class="btn btn-primary mt-3" href="/inscription"> Créer un compte </a>
        </div>

        <div class="d-flex justify-content-around text-danger f-5 fw-bold w-50 my-3">
            <!-- <c:if test="${ requestScope.message != '' }">
                <p>${ requestScope.message }</p>
            </c:if> -->
        </div>
    </div>
</template>

<style scoped>
</style>