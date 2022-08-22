<script>
export default {
    name: "VenteArticle"
}
</script>

<template>
    <div class="container-md">

        <h2>Nouvelle vente</h2>

        <form method="post" action="">

            <div class="d-flex justify-content-around align-items-center w-50 p-3">
                <div>
                    <div class="form-group">
                        <label for="article">Article : </label> <input type="text" class="form-control" id="article"
                            aria-describedby="article" name="nom_article" value="${param.article}">
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description :
                        </label>
                        <textarea class="form-control" id="description" rows="3" name="description"></textarea>
                    </div>

                    <div class="input-group mb-3 p-3">
                        <label class="input-group-text" for="inputGroupSelect01">Catégories</label>
                        <select class="form-select" id="catégories" name="no_categorie">
                            <c:if test="${ ! empty listeCategorie }">
                                <option selected>Toutes</option>
                                <!-- <c:forEach var="categorie" items="${ listeCategorie }">
                                    <option value="${categorie.no_categorie }">${categorie.libelle }</option>
                                </c:forEach> -->
                            </c:if>
                        </select>

                    </div>

                    <div class="form-group mb-3">
                        <label for="photoArticle">Photo de l' Article </label> <input type="file" class="form-control"
                            id="photoArticle" name="photoArticle">
                    </div>

                    <div class="form-group mb-3">
                        <label for="date">Mise à prix : </label> <input type="number" name="prix_vente"
                            value="${ param.prix_vente }" />
                    </div>

                    <div class="form-group mb-3">
                        <label for="date">Début de l'enchère : </label> <input type="date" name="date_debut_encheres"
                            value="${ param.date_debut_encheres }" />
                    </div>

                    <div class="form-group mb-3">
                        <label for="date">Fin de l'enchère : </label> <input type="date" name="date_fin_encheres"
                            value="${ param.date_fin_encheres}" />
                    </div>

                    <div>
                        <h3>Retrait</h3>
                    </div>

                    <div class="form-group mb-3">
                        <label for="article">Rue : </label> <input type="text" class="form-control" id="rue"
                            aria-describedby="rue" name="rue" value="${param.rue}">
                    </div>

                    <div class="form-group mb-3">
                        <label for="article">Code postal : </label> <input type="text" class="form-control"
                            id="code_postal" aria-describedby="code_postal" name="code_postal"
                            value="${param.code_postal}">
                    </div>

                    <div class="form-group mb-3">
                        <label for="article">Ville : </label> <input type="text" class="form-control" id="ville"
                            aria-describedby="ville" name="ville" value="${param.ville}">
                    </div>
                </div>
            </div>



            <div class="d-flex justify-content-around w-25 mt-3">

                <div>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>

                <div>
                    <a href="/encheres">
                        <button type="submit" class="btn btn-primary">Annuler</button>
                    </a>
                </div>
            </div>

        </form>

        <div>
            <!-- <c:if test="${ requestScope.message != '' }">
                <p>${ requestScope.message }</p>
            </c:if> -->
        </div>
    </div>
</template>

<style scoped>
</style>