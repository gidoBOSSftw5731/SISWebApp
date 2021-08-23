<template>
  <div class="max-w-full">
    <Navbar v-if="loggedIn && !pageLoading" />
    <div class="container-fluid page-body-wrapper" v-if="loggedIn && !pageLoading">
      <Sidebar />
      <router-view class="content" />
    </div>
    <Loader class="page-loader" v-if="pageLoading" />
    <button class="navbar-toggler mx-3 d-lg-none ml-auto flex" id="mobilemenu" v-on:click="toggleOffCanvas" type="button" data-toggle="offcanvas" aria-expanded="false" aria-label="Toggle navigation">
<!--class is in under an hour this is a bodge-->
<svg class="align-center mb-6" viewBox="0 0 100 80" width="40" height="40">
  <rect width="100" height="15"></rect>
  <rect y="30" width="100" height="15"></rect>
  <rect y="60" width="100" height="15"></rect>
</svg>    </button>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar/Navbar.vue";
  import Sidebar from "../components/Navbar/Sidebar.vue";
  import Loader from "../components/Loader.vue";

  export default {
    components: {
      Navbar,
      Sidebar,
      Loader
    },
    computed: {
      loggedIn() {
        return this.$store.getters["user/loggedIn"];
      },
      pageLoading() {
        return this.$store.getters["page/pageLoading"];
      }
    },
    methods: {
      checkLoggedIn() {
        if (!this.loggedIn) {
          this.$router.replace({ path: "/login", query: {next: this.$route.path}});
          return false;
        }
        return true;
      },
      toggleOffCanvas() {
        this.$store.commit("page/toggleOffCanvas");
      },
      async fetch() {
        this.$store.commit("page/setPageLoading", true);
        if (!this.checkLoggedIn()) {
          return;
        }
        await this.$store.dispatch("data/getChildList");
        this.$store.commit("page/setPageLoading", false);
      }
    },
    created() {
      this.fetch();
    },
    watch: {
      $route() {
        this.$store.commit("page/setOffCanvas", false);
      }
    }
  }
</script>

<style>
  .page-loader {
    z-index: 1030;
  }

  #mobilemenu {
    z-index: 3000;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 8rem;
    width: 3rem;
  }

  .navbar {
    z-index: 1000;
  }

  .sidebar {
    z-index: 999;
  }

  .content-loader {
    z-index: 700;
  }

  .content {
    z-index: 500;
  }
</style>
