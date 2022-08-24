<script>
export default {
  name: "Nav",
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand" href="/">Eni-Enchères</a>

      <!-- burger menu -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!--  Si l' utilisateur n'est pas connecté  -->
      <!-- <c:if test="${empty utilisateur.pseudo }"> -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/inscription">S'inscrire</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Se connecter</a>
          </li>
        </ul>
      </div>
      <!-- </c:if> -->

      <!-- <%-- Si l' utilisateur est connecté --%> -->
      <!-- <c:if test="${! empty utilisateur.pseudo }"> -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/ ">Enchères</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="vente-article">Vendre un article</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/profil">Mon profil</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="/">Déconnexion</a></li>

          <!--  Si l' utilisateur n'est pas connecté  -->
          <!-- <c:if test="${empty utilisateur.pseudo }"> -->

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/categories">Categories</a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/admin">Admin</a>
          </li>

        </ul>
      </div>
      <!-- </c:if> -->
    </div>
  </nav>
</template>

<style scoped>
</style>
