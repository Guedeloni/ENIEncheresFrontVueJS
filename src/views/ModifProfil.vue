<script>
export default {
    name: "ModifProfil"
}
</script>

<template>
    <div class="container-md">

        <h2>Modifier mon profil</h2>

        <form method="post" action="${pageContext.request.contextPath}/ModifierProfil">

            <div class="d-flex justify-content-around align-items-center w-50 p-3">
                <div>

                    <div class="form-group">
                        <label for="Pseudo">Pseudo</label> <input type="text" class="form-control" id="pseudo"
                            aria-describedby="pseudo" placeholder="votre pseudo" name="pseudo"
                            value="${utilisateur.pseudo}">


                    </div>

                    <div class="form-group mt-3">
                        <label for="nom">Nom</label> <input type="text" class="form-control" id="nom" placeholder="Doe"
                            name="nom" value="${utilisateur.nom}">

                    </div>

                    <div class="form-group mt-3">
                        <label for="prénom">Prénom</label> <input type="text" class="form-control" id="prenom"
                            placeholder="John" name="prenom" value="${utilisateur.prenom}">
                    </div>

                    <div class="form-group mt-3">
                        <label for="email">Email</label> <input type="email" class="form-control" id="email"
                            aria-describedby="email" placeholder="john-doe@gmail.com" name="email"
                            value="${utilisateur.email}">
                    </div>

                    <div class="form-group mt-3">
                        <label for="telephone">Téléphone</label> <input type="text" class="form-control" id="telephone"
                            aria-describedby="telephone" placeholder="06 12 39 84 52" name="telephone"
                            value="${utilisateur.telephone}">
                    </div>

                    <div class="form-group mt-3">
                        <label for="rue">Rue</label> <input type="text" class="form-control" id="rue"
                            placeholder="12 rue de l'Eni" name="rue" value="${utilisateur.rue}">
                    </div>

                </div>

                <div class="mt-3">
                    <div class="form-group mt-3">
                        <label for="code_postal">Code postal</label> <input type="text" class="form-control"
                            id="code_postal" placeholder="44000" name="code_postal" value="${utilisateur.code_postal}">
                    </div>

                    <div class="form-group mt-3">
                        <label for="ville">Ville</label> <input type="text" class="form-control" id="ville"
                            placeholder="Nantes" name="ville" value="${utilisateur.ville}">
                    </div>

                    <div class="form-group mt-3">
                        <label for="Mot de passe actuel">Mot de passe actuel</label> <input type="password"
                            class="form-control" id="mot_de_passe" name="mot_de_passe"
                            value="${utilisateur.mot_de_passe}">
                    </div>


                    <div class="form-group mt-3">
                        <label for="nouveau mot de passe">Nouveau mot de passe</label> <input type="password"
                            class="form-control" id="mot_de_passe" name="nouveau_mdp"
                            value="${utilisateur.mot_de_passe}">
                    </div>

                    <div class="form-group mt-3">
                        <label for="confirmation mot de passe">Confirmation</label> <input type="password"
                            class="form-control" id="mot_de_passe" name="confirmation_mdp"
                            value="${utilisateur.mot_de_passe}">
                    </div>
                </div>

            </div>

            <div>
                Crédit <span class="font-weight-bold">${utilisateur.credit}</span>
            </div>

            <div class="d-flex justify-content-around w-25 mt-3">

                <div>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>

            </div>

        </form>

        <form method="get" action="${pageContext.request.contextPath}/ModifierProfil">
            <button type="submit" class="btn btn-primary">Supprimer
                mon compte</button>
        </form>

        <!-- <%-- TODO : condition ternaire ou Javascript onclick pour des Modals d' alert--%>
            <%--
                class="d-flex justify-content-around ${ requestScope.message != '' ? text-success : text-danger} fs-5 fw-bold w-50 my-3">
                --%> -->

                <div class="d-flex justify-content-around text-danger fs-5 fw-bold w-50 my-3">
                    <c:if test="${ requestScope.message != '' }">
                        <p>${ requestScope.message }</p>
                    </c:if>
                </div>

                <div class="d-flex justify-content-around text-danger fs-5 fw-bold w-50 my-3">
                    <c:if test="${ requestScope.message_error != '' }">
                        <p>${ requestScope.message_error }</p>
                    </c:if>
                </div>

                <div class="d-flex justify-content-around text-success fs-5 fw-bold w-50 my-3">
                    <!-- <c:if test="${ requestScope.message_profil_modifie != '' }">
                        <p>${ requestScope.message_profil_modifie }</p>
                    </c:if> -->
                </div>

    </div>
</template>

<style scoped>
</style>