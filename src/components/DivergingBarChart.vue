<!-- src/components/DivergingBarChart.vue -->
<template>
    <div class="divergent-container">
        <div class="divergent-labels">
            <span class="left-label">{{ leftLabel }}</span>
            <span class="right-label">{{ rightLabel }}</span>
        </div>

        <div class="divergent-bars">
            <!-- Left Side -->
            <div class="bar left-bar" :style="{ width: leftPercent + '%' }">
                <span v-if="left > 0" class="bar-text-left">{{ left }}</span>
            </div>

            <!-- Middle Zero Line -->
            <div class="bar-divider"></div>

            <!-- Right Side -->
            <div class="bar right-bar" :style="{ width: rightPercent + '%' }">
                <span v-if="right > 0" class="bar-text-right">{{ right }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DivergingBarChart",
    props: {
        leftLabel: String,   // e.g. "Positive"
        rightLabel: String,  // e.g. "Negative"
        left: Number,        // numeric count
        right: Number,       // numeric count
    },
    computed: {
        total() {
            return (this.left + this.right) || 1;
        },
        leftPercent() {
            return (this.left / this.total) * 50; // left side uses 50% max
        },
        rightPercent() {
            return (this.right / this.total) * 50; // right side uses 50% max
        },
    },
};
</script>
