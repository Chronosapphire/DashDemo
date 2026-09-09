<!-- src/components/BarChart.vue -->
<template>
    <div class="bar-chart-container">
        <div class="bar-chart-row" v-for="(count, label) in data" :key="label">
            <span class="bar-chart-label">{{ label }}</span>

            <div class="bar-chart-bar-wrapper">
                <div class="bar-chart-bar" :style="{ width: barWidth(count) }"></div>
            </div>

            <span class="bar-chart-count">{{ count }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "BarChart",
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    computed: {
        maxValue() {
            const counts = Object.values(this.data || {});
            return Math.max(...counts, 1);
        },
    },
    methods: {
        barWidth(count) {
            return (count / this.maxValue) * 100 + "%";
        },
    },
};
</script>
