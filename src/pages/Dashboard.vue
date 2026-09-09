<!-- src/pages/Dashboard.vue -->
<template>
    <div class="dashboard-page">
        <section class="stats-grid">
            <StatCard label="TOTAL SUBMISSIONS" :value="stats.totalSubmissions" variant="info" />
            <StatCard label="POSITIVE OBSERVATIONS" :value="stats.observationType.Positive || 0"
                :subtitle="positivePercentText" variant="positive" />
            <StatCard label="NEGATIVE OBSERVATIONS" :value="stats.observationType.Negative || 0"
                :subtitle="negativePercentText" variant="negative" />
            <StatCard label="WORK RELATED" :value="stats.workRelatedCounts.WorkRelated || 0"
                :subtitle="workRelatedPercent" variant="warning" />

            <StatCard label="NON-WORK RELATED" :value="stats.workRelatedCounts.NonWorkRelated || 0"
                :subtitle="nonWorkRelatedPercent" variant="default" />
            <StatCard label="Tickets Resolved" :value="stats.tickets.resolved + ' / ' + stats.tickets.total"
                :subtitle="ticketsResolvedPercent" variant="info" />


        </section>

        <section class="stats-grid">
            <ChartCard title="Observation Type" subtitle="Positive vs Negative">
                <DivergingBarChart left-label="Positive" right-label="Negative" :left="stats.observationType.Positive"
                    :right="stats.observationType.Negative" />
            </ChartCard>
            <PieChartCard title="Work Related vs Non-Work Related" subtitle="distribution"
                :data="stats.primaryRiskAreaCounts" />


        </section>
        <PieChartCard title="Observation Type" subtitle="Positive vs Negative" :data="stats.observationType" />

        <section class="stats-grid">

            <ChartCard title="Intervention Type (Positive)" subtitle="Behaviour & Attitude, Compliance, etc.">
                <BarChart :data="stats.interventionPositive" />
            </ChartCard>

            <ChartCard title="Intervention Type (Positive & Negative)" subtitle="Environment, Hands Free Rules, etc.">
                <BarChart :data="stats.interventionGeneral" />

            </ChartCard>

        </section>

        <section class="dashboard-row">

            <ChartCard title="Primary Risk Area of Event" subtitle="Distribution by risk category">
                <!-- <RiskAreaChart :riskAreaCounts="stats.primaryRiskAreaCounts" /> -->
                <BarChart :data="stats.primaryRiskAreaCounts" />
            </ChartCard>
            <ChartCard title="Why " subtitle="Cause">
                <!-- <WhyChart :whyCounts="stats.negativeWhyCounts" :whyDetailsCounts="stats.negativeWhyDetailsCounts" /> -->
                <BarChart :data="stats.negativeWhyCounts" />
            </ChartCard>
            <ChartCard title="Why Details " subtitle="Root Cause">
                <!-- <WhyChart :whyCounts="stats.negativeWhyCounts" :whyDetailsCounts="stats.negativeWhyDetailsCounts" /> -->
                <BarChart :data="stats.negativeWhyDetailsCounts" />
            </ChartCard>

        </section>
    </div>
</template>

<script>
import StatCard from "../components/StatCard.vue";
import ChartCard from "../components/ChartCard.vue";
import RiskAreaChart from "../components/RiskAreaChart.vue";
import WhyChart from "../components/WhyChart.vue";
import DivergingBarChart from "@/components/DivergingBarChart.vue";
import BarChart from "../components/BarChart.vue";
import PieChartCard from "../components/PieChartCard.vue";




export default {
    name: "Dashboard",
    components: { StatCard, ChartCard, RiskAreaChart, WhyChart, DivergingBarChart, BarChart, PieChartCard, },
    data() {
        return {
            // Dummy data for now; replace later with API call
            stats: {
                totalSubmissions: 42,
                observationType: {
                    Positive: 25,
                    Negative: 17,

                },
                workRelatedCounts: {
                    WorkRelated: 30,
                    NonWorkRelated: 12,
                },
                interventionPositive: {
                    "Behaviour & Attitude": 10,
                    Compliance: 7,
                    Exemplary: 5,
                    Expected: 3,
                },
                interventionGeneral: {
                    Environment: 12,
                    "Hands Free Rules": 8,
                    "Life Saving Rules": 6,
                    PAUSE: 5,
                    "Process Safety Fundamentals": 4,
                    "Think Secure": 7,
                },
                primaryRiskAreaCounts: {
                    "Air transport": 2,
                    "Dropped or fallen objects": 4,
                    "Exposure to workplace health hazards": 3,
                    "Maritime and water related": 1,
                    "Non-process safety related leaks, spills, fires or explosions": 1,
                    "Overexertion or strain": 5,
                    "Rail transport": 0,
                    "Security related": 2,
                    "Struck by moving objects or machinery": 6,
                    "Caught in, under, or between": 3,
                    "Exposure to electricity": 2,
                    "Minor cuts, abrasions, burns or punctures": 4,
                    "Non work-related illness, injury or death": 1,
                    "Process safety": 2,
                    "Road transport": 4,
                    "Slips and trips": 4,
                    "Product quality/loss/stewardship": 2,
                },
                negativeWhyCounts: {
                    Aware: 5,
                    Mistake: 4,
                    "Not Aware": 3,
                    "Slips and Lapses": 3,
                    Unintended: 2,
                },
                negativeWhyDetailsCounts: {
                    "Mistake: Insufficient HSE Coaching/Training": 2,
                    "Mistake: Not Aware": 1,
                    "Mistake: Not Requested": 1,
                    "Slips and Lapses: Insufficient HSE Coaching/Training": 1,
                    "Slips and Lapses: Not Aware": 1,
                    "Slips and Lapses: Not Requested": 1,
                    "Aware: Behaviour & Attitude (not intentionally)": 1,
                    "Aware: Damaged": 1,
                    "Aware: Lack of Ownership": 1,
                    "Aware: Lack of Skill": 1,
                    "Not Aware: Language Problem": 1,
                    "Not Aware: Not Informed": 1,
                    "Not Aware: Poor maintained": 1,
                    "Not Aware: Slips/lapse": 1,
                    "Unintended: Insufficient HSE Coaching/Training": 1,
                    "Unintended: Not Aware": 1,
                    "Unintended: Not Requested": 0,
                },
                tickets: {
                    resolved: 8,   // example numbers
                    total: 12,
                },

            },
        };
    },
    computed: {
        ticketsResolvedPercent() {
            const r = this.stats.tickets.resolved || 0;
            const t = this.stats.tickets.total || 1;
            return `${((r / t) * 100).toFixed(1)}% resolved`;
        },

        positivePercentText() {
            const total = this.stats.totalSubmissions || 1;
            const positive = this.stats.observationType.Positive || 0;
            const percent = (positive / total) * 100;
            return `${percent.toFixed(1)}% of total`;
        },
        negativePercentText() {
            const total = this.stats.totalSubmissions || 1;
            const negative = this.stats.observationType.Negative || 0;
            const percent = (negative / total) * 100;
            return `${percent.toFixed(1)}% of total`;
        },
        workRelatedPercent() {
            const total = this.stats.totalSubmissions || 1;
            const work = this.stats.workRelatedCounts.WorkRelated || 0;
            return `${((work / total) * 100).toFixed(1)}%`;
        },

        nonWorkRelatedPercent() {
            const total = this.stats.totalSubmissions || 1;
            const non = this.stats.workRelatedCounts.NonWorkRelated || 0;
            return `${((non / total) * 100).toFixed(1)}%`;
        },
    },
};
</script>
