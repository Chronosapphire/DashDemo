<!-- src/components/ChartCard.vue -->
<template>
    <section class="chart-card">
        <header class="chart-card-header">
            <h2>{{ title }}</h2>
            <p v-if="subtitle" class="chart-card-subtitle">{{ subtitle }}</p>
        </header>

        <div class="chart-card-body">
            <!-- Placeholder: later you can mount an actual chart library here -->
            <slot />
        </div>
    </section>
</template>

<script>
export default {
    name: "ChartCard",
    props: {
        title: String,
        subtitle: String,
    },
};
</script>
