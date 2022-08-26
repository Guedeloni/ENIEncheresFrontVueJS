<script setup>
import { ref }          from 'vue';
import { useRouter }    from 'vue-router';

const pseudo        = ref("")
const password      = ref("")
const errorMessage  = ref("")

const router        = useRouter()

async function login() {
    // le corps de notre requête HTTP (format JSON)
    const body = {
        pseudo: pseudo.value,
        motDePasse: password.value
    }
    // On envoie une requête POST sur l'url BASE_URL + “login" avec les données définies plus haut
    const result = await axios.post("login", body)
                            .catch(function (error) {
                                console.log(error.response);
                                if (error.response &&
                                    error.response.data &&
                                    error.response.data.status == 403) {
                                        errorMessage.value = "Pseudo ou mot de passe non reconnu";
                                }
                            });
    localStorage.setItem('jwt', result.data);
    router.push('/');
}

</script>

<template>
    <div class="container-md">

        <form method="post" action="">
            <div class="form-group w-25">
                <label for="pseudo">Identifiant</label>
                <input type="text" class="form-control" id="pseudo" name="pseudoInput" aria-describedby="pseudo"
                    placeholder="NineJea" v-model="pseudo">
            </div>

            <div class="form-group w-25 mt-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="motDePasse" name="mdpInput" placeholder="Password"
                    v-model="password">
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

        <div class="d-flex justify-content-around text-success f-5 fw-bold w-50 my-3">
            {{ errorMessage }}
        </div>
    </div>

</template>

<style scoped>
</style>