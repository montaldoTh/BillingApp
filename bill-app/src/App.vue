<template>
  <div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-between py-3 px-4 mb-4 border-bottom">
      <RouterLink :to="{
        name: 'home'
      }"
        class="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-primary"
      >
        <i class="fa-solid fa-wallet fa-2x" />
        <span class="fs-3">Factures</span>
      </RouterLink>
      <ul class="nav nav-pills gap-2">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-house" /> Accueil
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/charts" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-house" /> Charts
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/bills" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-wallet"></i> Factures
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/users" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-users"></i> Clients
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link" active-class="active" exact-active-class="active">
            A propos
          </RouterLink>

          <!--
            active-class & exact-active-class
            permet de définir une classe lorsqu'on se trouve sur une route

            exact-active-class s'applique au sous liens (menu dropdown par ex)
          -->
        </li>
      </ul>
    </header>

    <main class="container main-router-container">
      <RouterView />
    </main>

    <footer class="py-3 my-4 border-top text-center">
      <span class="mb-3 mb-md-0 text-body-secondary">© {{ currentYear }} Factures.app</span>
    </footer>
  </div>
</template>

<script>



export default {
  data() {
    return {
      
    }
  },
  computed: {
    currentYear(){
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
  a{text-decoration: none;}
  header, footer{color: #49347a;}
</style>
