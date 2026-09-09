<template>
  <div class="welcome-loader">
    <div class="welcome-content">
      <h1>Safety First.</h1>
      <p>Every observation matters.</p>
    </div>
  </div>
</template>

<style scoped>
.welcome-loader {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at top, #1b2f26, #0f1a14);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.welcome-content {
  text-align: center;
  color: #e6f2ea;
}

.welcome-content h1 {
  font-size: 3rem;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.welcome-content p {
  font-size: 1.1rem;
  opacity: 0.8;
}
</style>
