<!-- src/components/Topbar.vue -->
<template>
    <header class="topbar">
        <div class="topbar-title">
            <h1>{{ pageTitle }}</h1>
        </div>
    </header>
</template>

<script>
export default {
    name: "Topbar",
    computed: {
        pageTitle() {
            const routeName = this.$route.name;
            if (routeName === "Dashboard") return "TAGUR Overview";
            if (routeName === "Submissions") return "Submissions";
            if (routeName === "About") return "About";
            return "TAGUR Dashboard";
        },
    },
};
</script>
