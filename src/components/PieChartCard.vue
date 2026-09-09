<!-- src/components/PieChartCard.vue -->
<template>
    <section class="pie-card">
        <header class="pie-card-header">
            <h2 class="pie-card-title">{{ title }}</h2>
            <p v-if="subtitle" class="pie-card-subtitle">{{ subtitle }}</p>
        </header>

        <div class="pie-card-body">
            <div class="pie-wrap">
                <svg class="pie-svg" viewBox="0 0 42 42" role="img" aria-label="Pie chart">
                    <!-- background ring -->
                    <circle class="pie-bg" cx="21" cy="21" r="15.915" />

                    <!-- slices -->
                    <template v-for="(s, idx) in slices" :key="s.label">
                        <circle class="pie-slice" cx="21" cy="21" r="15.915" :stroke="colors[idx % colors.length]"
                            :stroke-dasharray="`${s.percent} ${100 - s.percent}`" :stroke-dashoffset="s.offset" />
                    </template>
                </svg>

                <div class="pie-center">
                    <div class="pie-total">{{ total }}</div>
                    <div class="pie-total-label">Total</div>
                </div>
            </div>

            <div class="pie-legend">
                <div class="legend-row" v-for="(s, idx) in slices" :key="s.label + '-legend'">
                    <span class="legend-dot" :style="{ background: colors[idx % colors.length] }"></span>

                    <span class="legend-label">{{ s.label }}</span>

                    <span class="legend-count">{{ s.value }}</span>
                    <span class="legend-percent">{{ s.percent.toFixed(1) }}%</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "PieChartCard",
    props: {
        title: { type: String, required: true },
        subtitle: { type: String, default: "" },

        // data format: { "Positive": 25, "Negative": 17 }
        data: { type: Object, required: true },

        // optional custom palette
        colors: {
            type: Array,
            default: () => ["#4f46e5", "#ef4444", "#22c55e", "#f59e0b", "#06b6d4"],
        },
    },
    computed: {
        total() {
            return Object.values(this.data || {}).reduce((a, b) => a + (b || 0), 0);
        },
        slices() {
            const entries = Object.entries(this.data || {}).filter(
                ([, v]) => (v || 0) > 0
            );

            const total = this.total || 1;

            let runningOffset = 25; // start at top
            return entries.map(([label, value]) => {
                const percent = (value / total) * 100;
                const slice = {
                    label,
                    value,
                    percent,
                    offset: runningOffset,
                };
                runningOffset -= percent;
                return slice;
            });
        },
    },
};
</script>

<style scoped>
.pie-card {
    background: #020617;
    border: 1px solid #1f2937;
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    width: 100%;
}

.pie-card-header h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
}

.pie-card-subtitle {
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.25rem;
}

.pie-card-body {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1rem;
    align-items: center;
    margin-top: 0.75rem;
}

.pie-wrap {
    position: relative;
    width: 220px;
    height: 220px;
    display: grid;
    place-items: center;
}

.pie-svg {
    width: 220px;
    height: 220px;
    transform: rotate(-90deg);
}

.pie-bg {
    fill: none;
    stroke: #111827;
    stroke-width: 6;
}

.pie-slice {
    fill: none;
    stroke-width: 6;
    stroke-linecap: butt;
}

.pie-center {
    position: absolute;
    width: 120px;
    height: 120px;
    background: #020617;
    border: 1px solid #1f2937;
    border-radius: 999px;
    display: grid;
    place-items: center;
    text-align: center;
}

.pie-total {
    font-size: 1.4rem;
    font-weight: 700;
    color: #e5e7eb;
}

.pie-total-label {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: -0.4rem;
}

.pie-legend {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    width: 100%;
}

.legend-row {
    display: grid;
    grid-template-columns: 14px 1fr auto auto;
    gap: 0.6rem;
    align-items: center;
    padding: 0.35rem 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
}

.legend-row:hover {
    border-color: #1f2937;
    background: #0b1220;
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
}

.legend-label {
    color: #d1d5db;
    font-size: 0.9rem;
}

.legend-count {
    color: #e5e7eb;
    font-variant-numeric: tabular-nums;
    width: 48px;
    text-align: right;
}

.legend-percent {
    color: #9ca3af;
    font-variant-numeric: tabular-nums;
    width: 64px;
    text-align: right;
}

/* Responsive */
@media (max-width: 900px) {
    .pie-card-body {
        grid-template-columns: 1fr;
        justify-items: center;
    }

    .pie-legend {
        width: 100%;
    }
}
</style>
