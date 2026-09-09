<!-- src/App.vue -->
<template>
  <!-- App renders immediately (loads while overlay is shown) -->
  <div class="app-container">
    <Sidebar />

    <div class="app-main">
      <Topbar />
      <main class="app-content">
        <RouterView v-slot="{ Component }">
          <KeepAlive :include="keepAliveInclude">
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </main>
    </div>
  </div>

  <!-- Welcome overlay on top (first load/refresh only) -->
  <Transition name="welcome">
    <div v-if="showWelcome" class="welcome-overlay">
      <WelcomeLoader />
    </div>
  </Transition>
</template>

<script>
import { RouterView } from "vue-router";
import Sidebar from "/src/components/Sidebar.vue";
import Topbar from "./components/Topbar.vue";
import WelcomeLoader from "./components/WelcomeLoader.vue";

export default {
  name: "App",
  components: { Sidebar, Topbar, RouterView, WelcomeLoader },

  data() {
    return {
      showWelcome: false,
      welcomeTimer: null,
      keepAliveInclude: ["Dashboard", "Tickets", "Submissions"],
    };
  },

  mounted() {
    const hasSeenWelcome = sessionStorage.getItem("tagur_welcome_seen");

    if (!hasSeenWelcome) {
      this.showWelcome = true;
      sessionStorage.setItem("tagur_welcome_seen", "true");

      this.welcomeTimer = setTimeout(() => {
        this.showWelcome = false;
        this.welcomeTimer = null;
      }, 5000);
    }
  },

  beforeUnmount() {
    if (this.welcomeTimer) {
      clearTimeout(this.welcomeTimer);
      this.welcomeTimer = null;
    }
  },
};
</script>

<style>
/* Overlay that sits on top while app loads underneath */
.welcome-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
}

/* Smooth ease-out transition (no "emotionless" cut) */
.welcome-enter-active,
.welcome-leave-active {
  transition: opacity 700ms ease, transform 700ms ease;
  will-change: opacity, transform;
}

.welcome-enter-from,
.welcome-leave-to {
  opacity: 0;
  transform: scale(0.985);
}

.welcome-enter-to,
.welcome-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
