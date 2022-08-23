<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="container-md w-75 text-center">
        <!-- <c:if test="${ request.getSession(false) != null }">  -->

        <h2 class="mt-3 mb-3">Mon profil</h2>

        <div class="mb-3"><span class="text-secondary">Pseudo :</span> {{ utilisateur.pseudo }}</div>
        <div class="mb-3"><span class="text-secondary">Nom :</span> {{ utilisateur.nom }}</div>
        <div class="mb-3"><span class="text-secondary">Prénom :</span> {{ utilisateur.prenom }}</div>
        <div class="mb-3"><span class="text-secondary">Email :</span> {{ utilisateur.email }}</div>
        <div class="mb-3"><span class="text-secondary">Telèphone :</span> {{ utilisateur.telephone }}</div>
        <div class="mb-3"><span class="text-secondary">Rue :</span> {{ utilisateur.rue }}</div>
        <div class="mb-3"><span class="text-secondary">Code postal :</span> {{ utilisateur.code_postal }}</div>
        <div class="mb-3"><span class="text-secondary">Ville :</span> {{ utilisateur.ville }}</div>


        <div class="contenu">
            <a href="/modif_profil"> <input type="submit" value="Modifier" class="btn btn-primary" />
            </a>
        </div>

    </div>
    <!-- </c:if>  -->

    <!-- <c:if test="${ request.getSession(false) = null }"> -->
    <h1>Pas de session en cours</h1>
    <div class="contenu">
        <a href="/encheres">
            <input type="submit" value="Retour à l'accueil" />
        </a>
    </div>
    <!-- </c:if>  -->
</template>

<style scoped>
</style>