<!-- src/App.vue -->
<template>
  <div class="app-container">
    <Sidebar />

    <div class="app-main">
      <Topbar />
      <main class="app-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "/src/components/Sidebar.vue";
import Topbar from "./components/Topbar.vue";

export default {
  name: "App",
  components: { Sidebar, Topbar, RouterView },
};
</script>
