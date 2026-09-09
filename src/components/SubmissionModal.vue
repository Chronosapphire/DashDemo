<!-- src/components/SubmissionModal.vue -->
<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal">
            <header class="modal-header">
                <h2>Submission Details</h2>
                <button class="modal-close" @click="$emit('close')">×</button>
            </header>

            <section class="modal-body" v-if="submission">
                <div class="modal-section">
                    <h3>Basic Info</h3>
                    <p><strong>Date:</strong> {{ formattedDate }}</p>
                    <p><strong>Name:</strong> {{ submission.name }}</p>
                    <p><strong>Submission ID:</strong> {{ submission.submissionId }}</p>
                    <p>
                        <strong>Observation Type:</strong>
                        <span class="tag" :class="submission.observationType === 'Positive'
                                ? 'tag-positive'
                                : 'tag-negative'
                            ">
                            {{ submission.observationType }}
                        </span>
                    </p>
                </div>

                <div class="modal-section">
                    <h3>Intervention Type</h3>
                    <div v-if="submission.observationType === 'Positive'">
                        <p><strong>Positive:</strong></p>
                        <ul>
                            <li v-for="item in submission.interventionPositive || []" :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <p><strong>General (Positive & Negative):</strong></p>
                    <ul>
                        <li v-for="item in submission.interventionGeneral || []" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <div class="modal-section">
                    <h3>Primary Risk Area of Event</h3>
                    <p>{{ submission.primaryRiskArea }}</p>
                </div>

                <div class="modal-section" v-if="submission.observationType === 'Negative'">
                    <h3>Why (Negative Only)</h3>
                    <p><strong>Why:</strong> {{ submission.negativeWhy }}</p>
                    <p><strong>Why Detail:</strong> {{ submission.negativeWhyDetail }}</p>
                </div>
            </section>

            <footer class="modal-footer">
                <button class="btn" @click="$emit('close')">Close</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubmissionModal",
    props: {
        submission: {
            type: Object,
            default: null,
        },
    },
    computed: {
        formattedDate() {
            if (!this.submission || !this.submission.date) return "";
            return new Date(this.submission.date).toLocaleString();
        },
    },
};
</script>
