<!-- src/pages/Submissions.vue -->
<template>
    <div class="submissions-page">
        <h2>Submissions</h2>
        <p class="submissions-description">
            Click a row to view full details of the submission.
        </p>

        <div class="submissions-table-wrapper">
            <table class="submissions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Submission ID</th>
                        <th>Observation Type</th>
                    </tr>
                </thead>
                <tbody>
                    <SubmissionRow v-for="submission in submissions" :key="submission.id" :submission="submission"
                        @select="openSubmission" />
                </tbody>
            </table>
        </div>

        <SubmissionModal v-if="selectedSubmission" :submission="selectedSubmission"
            @close="selectedSubmission = null" />
    </div>
</template>

<script>
import SubmissionRow from "../components/SubmissionRow.vue";
import SubmissionModal from "../components/SubmissionModal.vue";

export default {
    name: "Submissions",
    components: { SubmissionRow, SubmissionModal },
    data() {
        return {
            // Dummy submissions for now; later replace with API call
            submissions: [
                {
                    id: 1,
                    submissionId: "TAGUR-001",
                    date: "2025-11-20T09:30:00Z",
                    name: "Ali bin Ahmad",
                    observationType: "Positive",
                    interventionPositive: ["Behaviour & Attitude"],
                    interventionGeneral: ["Environment", "Think Secure"],
                    primaryRiskArea: "Slips and trips",
                    negativeWhy: null,
                    negativeWhyDetail: null,
                },
                {
                    id: 2,
                    submissionId: "TAGUR-002",
                    date: "2025-11-20T10:15:00Z",
                    name: "Siti binti Muhammad",
                    observationType: "Negative",
                    interventionPositive: [],
                    interventionGeneral: ["Hands Free Rules", "Process Safety Fundamentals"],
                    primaryRiskArea: "Struck by moving objects or machinery",
                    negativeWhy: "Mistake",
                    negativeWhyDetail:
                        "Mistake: Insufficient HSE Coaching/Training",
                },
                {
                    id: 3,
                    submissionId: "TAGUR-003",
                    date: "2025-11-21T14:00:00Z",
                    name: "Ahmad bin Yusuf",
                    observationType: "Negative",
                    interventionPositive: [],
                    interventionGeneral: ["PAUSE"],
                    primaryRiskArea: "Road transport",
                    negativeWhy: "Not Aware",
                    negativeWhyDetail: "Not Aware: Not Informed",
                },
            ],
            selectedSubmission: null,
        };
    },
    methods: {
        openSubmission(sub) {
            this.selectedSubmission = sub;
        },
    },
};
</script>
