<!-- src/components/WhyChart.vue -->
<template>
    <div class="why-chart-container">
        <h3>Why (Negative Events)</h3>
        <ul class="why-list">
            <li v-for="item in whyList" :key="item.name">
                <span class="why-name">{{ item.name }}</span>
                <span class="why-count">{{ item.count }}</span>
                <span class="why-percent">{{ item.percentage.toFixed(1) }}%</span>
            </li>
        </ul>

        <h3 class="why-details-title">Why Details (Negative Events)</h3>
        <ul class="why-list">
            <li v-for="item in whyDetailsList" :key="item.name">
                <span class="why-name">{{ item.name }}</span>
                <span class="why-count">{{ item.count }}</span>
                <span class="why-percent">{{ item.percentage.toFixed(1) }}%</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "WhyChart",
    props: {
        whyCounts: {
            type: Object,
            required: true,
        },
        whyDetailsCounts: {
            type: Object,
            required: true,
        },
    },
    computed: {
        whyList() {
            return this.toList(this.whyCounts);
        },
        whyDetailsList() {
            return this.toList(this.whyDetailsCounts);
        },
    },
    methods: {
        toList(obj) {
            const entries = Object.entries(obj || {});
            const total = entries.reduce((sum, [, count]) => sum + count, 0) || 1;
            return entries
                .map(([name, count]) => ({
                    name,
                    count,
                    percentage: (count / total) * 100,
                }))
                .sort((a, b) => b.count - a.count);
        },
    },
};
</script>
