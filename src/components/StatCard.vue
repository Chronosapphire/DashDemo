<template>
    <div class="stat-card" :class="variantClass">
        <div class="stat-card-label">{{ label }}</div>
        <div class="stat-card-value">{{ value }}</div>
        <div v-if="subtitle" class="stat-card-subtitle">{{ subtitle }}</div>
    </div>
</template>

<script>
export default {
    name: "StatCard",
    props: {
        label: String,
        value: [String, Number],
        subtitle: String,
        variant: {
            type: String,
            default: "default", // default | positive | negative | info | warning
        },
    },
    computed: {
        variantClass() {
            return `stat-card--${this.variant}`;
        },
    },
};
</script>
