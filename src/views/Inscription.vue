<script setup>
import { ref } from 'vue'

const pseudo = ref("")
const nom = ref("")
const prenom = ref("")
const email = ref("")
const telephone = ref("")
const rue = ref("")
const codePostal = ref("")
const ville = ref("")
const password = ref("")
const confirmPassword = ref("")
const messageError = ref("")
const messageConfirmation = ref("")

async function signup() {

     if(password.value !== confirmPassword.value ){
        messageError.value="mot de passe différent !"
        return null;
    }
   
    const body = {
        pseudo: pseudo.value,
        prenom: prenom.value,
        nom: nom.value,
        email:email.value,
        telephone:telephone.value,
        rue: rue.value,
        codePostal: codePostal.value,
        ville: ville.value,
        motDePasse: password.value
    }
   
    const result = await axios.post("inscription", body);

    localStorage.setItem('jwt', result.data);

    // vider les inputs
    pseudo.value = "",
    prenom.value = "",
    email.value = "",
    rue.value = "",
    codePostal.value = "",
    ville.value = "",
    password.value = ""
    confirmPassword.value = ""
    messageError.value = ""
    messageConfirmation.value = "Vous êtes bien inscrit"
}

</script>

<template>
    <div>
        <h2>Inscription</h2>

        <div class="container-md">

            <h2>Creer mon Profil</h2>

            <form method="post">

                <div class="d-flex justify-content-around align-items-center w-50 p-3">
                    <div>
                        <div class="form-group">
                            <label for="Pseudo">Pseudo</label> 
                            <input 
                                type="text" 
                                class="form-control" 
                                id="pseudo"
                                aria-describedby="pseudo" 
                                placeholder="votre pseudo" 
                                name="pseudo"
                                v-model="pseudo"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="nom">Nom</label>
                             <input 
                                type="text" 
                                class="form-control" 
                                id="nom"
                                aria-describedby="nom" 
                                placeholder="Doe" 
                                name="nom"
                                v-model="nom"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="prénom">Prénom</label>
                             <input 
                                type="text" 
                                class="form-control" 
                                id="prenom"
                                aria-describedby="prenom" 
                                placeholder="John" 
                                name="prenom"
                                v-model="prenom"
                            > 
                        </div>

                        <div class="form-group mt-3">
                            <label for="email">Email</label> 
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email"
                                aria-describedby="email" 
                                placeholder="john-doe@gmail.com" 
                                name="email"
                                v-model="email"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="telephone">Téléphone</label> 
                            <input 
                                type="text" 
                                class="form-control"
                                id="telephone" 
                                aria-describedby="telephone" 
                                placeholder="06 12 39 84 52"
                                name="telephone" 
                                v-model="telephone"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="rue">Rue</label> 
                            <input 
                                type="text" 
                                class="form-control" 
                                id="rue"
                                placeholder="12 rue de l'Eni" 
                                name="rue" 
                                v-model="rue"
                            >
                        </div>
                    </div>

                    <div class="mt-3">
                        <div class="form-group mt-3">
                            <label for="codePostal">Code postal</label> 
                            <input 
                                type="text" 
                                class="form-control"
                                id="codePostal" 
                                placeholder="44000" 
                                name="codePostal" 
                                v-model="codePostal"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="ville">Ville</label> 
                            <input 
                                type="text" 
                                class="form-control" 
                                id="ville"
                                placeholder="Nantes" 
                                name="ville" 
                                v-model="ville"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="Mot de passe actuel">Mot de passe</label> 
                            <input 
                                type="password"
                                class="form-control" 
                                id="motDePasse" 
                                name="motDePasse"
                                v-model="password"
                            >
                        </div>

                        <div class="form-group mt-3">
                            <label for="confirmation mot de passe">Confirmation</label>
                             <input 
                                type="password"
                                class="form-control" 
                                id="confirmPassword" 
                                name="confirmPassword"
                                v-model="confirmPassword"
                            >
                        </div>
                    </div>

                </div>

                <div class="d-flex justify-content-around w-25 mt-3">

                    <div>
                        <button type="button" class="btn btn-primary" @click="signup">Créer</button>
                    </div>

                    <div>
                        <a href="/">
                        <button type="submit" class="btn btn-primary">Annuler</button>
                        </a>
                    </div>
                </div>

            </form>

            <div class="d-flex justify-content-around text-success fs-5 fw-bold w-50 my-3">
                {{messageConfirmation}}
            </div>

            <div class="d-flex justify-content-around text-danger fs-5 fw-bold w-50 my-3">
                {{messageError}}
            </div>

        </div>
    </div>
</template>

<style scoped>
</style>