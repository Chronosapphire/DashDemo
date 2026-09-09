<!-- src/components/SubmissionRow.vue -->
<template>
    <tr class="submission-row" @click="$emit('select', submission)">
        <td>{{ formattedDate }}</td>
        <td>{{ submission.name }}</td>
        <td>{{ submission.submissionId }}</td>
        <td>
            <span class="tag" :class="submission.observationType === 'Positive' ? 'tag-positive' : 'tag-negative'">
                {{ submission.observationType }}
            </span>
        </td>
    </tr>
</template>

<script>
export default {
    name: "SubmissionRow",
    props: {
        submission: {
            type: Object,
            required: true,
        },
    },
    computed: {
        formattedDate() {
            if (!this.submission.date) return "";
            const d = new Date(this.submission.date);
            return d.toLocaleDateString();
        },
    },
};
</script>
