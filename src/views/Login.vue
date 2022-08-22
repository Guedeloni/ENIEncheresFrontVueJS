<script>
export default {
    name:"Login"
}
</script>

<template>
    <div class="container-md">
        <form method="post" action="">
        <div class="form-group w-25">
            <label for="pseudo">Identifiant</label> <input type="text" class="form-control" id="pseudo"
                name="pseudoInput" aria-describedby="pseudo" placeholder="NineJea">
        </div>

        <div class="form-group w-25 mt-3">
            <label for="password">Password</label> <input type="password" class="form-control" id="mot_de_passe"
                name="mdpInput" placeholder="Password">
        </div>

        <div class="d-flex justify-content-around w-25 mt-3">
            <div>
                <button type="submit" class="btn btn-primary">Connexion</button>

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