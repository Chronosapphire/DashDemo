<!-- src/components/Sidebar.vue -->
<template>
    <aside class="sidebar">
        <div class="sidebar-logo">
            <span class="sidebar-logo-title">TAGUR Dashboard</span>
        </div>

        <nav class="sidebar-nav">
            <RouterLink to="/" class="sidebar-link" :class="{ active: $route.name === 'Dashboard' }">
                Overview
            </RouterLink>

            <RouterLink to="/submissions" class="sidebar-link" :class="{ active: $route.name === 'Submissions' }">
                Submissions
            </RouterLink>

            <RouterLink to="/tickets" class="sidebar-link" :class="{ active: $route.name === 'Tickets' }">
                Tickets
            </RouterLink>

            <RouterLink to="/about" class="sidebar-link" :class="{ active: $route.name === 'About' }">
                About
            </RouterLink>
        </nav>
    </aside>
</template>

<script>
export default {
    name: "Sidebar",
};
</script>
