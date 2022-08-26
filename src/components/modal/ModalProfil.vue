<script setup>
defineProps([
    "pseudo",
    "nom",
    "prenom",
    "email",
    "telephone",
    "rue",
    "codePostal",
    "ville",
    "credit",
    "avatar",
    "show",
    "closeModal",
    "modifierProfil",
    "messageError"
]);
</script>

<template>
    <div class="modal fade" :class="{ show: show, 'd-block': show }" id="ModalProfil" tabindex="-1" aria-labelledby=""
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalProfil">Modifier vore profil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal" />
                </div>
                <div class="modal-body">
                    <form method="post">
                        <div class="mb-3">
                            <label for="avatar" class="form-label">Avatar</label>
                            <input type="text" class="form-control" id="avatar" aria-describedby="avatar"
                                v-model="avatar">
                        </div>
                        <div class="mb-3">
                            <label for="Pseudo" class="form-label">Pseudo</label>
                            <input type="text" class="form-control" id="pseudo" aria-describedby="pseudo"
                                v-model="pseudo" required>
                        </div>
                        <div class="mb-3">
                            <label for="Nom" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="nom" aria-describedby="nom" v-model="nom"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="prenom" class="form-label">Prenom</label>
                            <input type="text" class="form-control" id="prenom" aria-describedby="prenom"
                                v-model="prenom" required>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="email" name="email"
                                v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="telephone" class="form-label">Telephone</label>
                            <input type="text" class="form-control" id="telephone" aria-describedby="telephone"
                                v-model="telephone" required>
                        </div>
                        <div class="mb-3">
                            <label for="rue" class="form-label">Rue</label>
                            <input type="text" class="form-control" id="rue" aria-describedby="rue" v-model="rue"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="codePostal" class="form-label">Code Postal</label>
                            <input type="text" class="form-control" id="codePostal" aria-describedby="codePostal"
                                v-model="codePostal" required>
                        </div>
                        <div class="mb-3">
                            <label for="ville" class="form-label">Ville</label>
                            <input type="text" class="form-control" id="ville" aria-describedby="ville" v-model="ville"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="currentPassword" class="form-label">Password actuel</label>
                            <input type="password" class="form-control" id="currentPassword">
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">Nouveau Password</label>
                            <input type="password" class="form-control" id="newPassword">
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword">Confirmation du mot de passe</label>
                            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                                v-model="confirmPassword" required>
                        </div>
                    </form>

                    <div class="d-flex justify-content-around text-danger fs-5 fw-bold w-50 my-3">
                        <!-- Mot de passe OU tous les champs sont requis -->
                        {{ messageError }}

                    </div>
                    <slot name="body" />
                </div>
                <div class="modal-footer">
                    <slot name="footer" />
                    <button type="button" class="btn btn-primary" @click="modifierProfil">Submit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>