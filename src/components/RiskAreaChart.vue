<!-- src/components/RiskAreaChart.vue -->
<template>
    <div class="risk-area-container">
        <table class="risk-area-table">
            <thead>
                <tr>
                    <th>Primary Risk Area</th>
                    <th>Count</th>
                    <th>Bar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortedData" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.count }}</td>
                    <td>
                        <div class="risk-area-bar-wrapper">
                            <div class="risk-area-bar" :style="{ width: item.percentage + '%' }"></div>
                            <span class="risk-area-bar-label">
                                {{ item.percentage.toFixed(1) }}%
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "RiskAreaChart",
    props: {
        riskAreaCounts: {
            type: Object,
            required: true,
        },
    },
    computed: {
        sortedData() {
            const entries = Object.entries(this.riskAreaCounts || {});
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
