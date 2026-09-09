<!-- src/components/TicketModal.vue -->
<template>
    <div class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal">
            <header class="modal-header">
                <h2>Ticket Details</h2>
                <button class="modal-close" @click="$emit('close')">×</button>
            </header>

            <section class="modal-body" v-if="ticket">
                <!-- BASIC INFO -->
                <div class="modal-section">
                    <h3>Submission Info</h3>
                    <p><strong>Date:</strong> {{ formattedDate }}</p>
                    <p><strong>Name:</strong> {{ ticket.name }}</p>
                    <p><strong>Submission ID:</strong> {{ ticket.submissionId }}</p>
                    <p>
                        <strong>Observation Type:</strong>
                        <span class="tag" :class="ticket.observationType === 'Positive'
                                ? 'tag-positive'
                                : 'tag-negative'
                            ">
                            {{ ticket.observationType }}
                        </span>
                    </p>
                </div>

                <!-- INTERVENTION -->
                <div class="modal-section">
                    <h3>Intervention Type</h3>

                    <div v-if="ticket.interventionPositive?.length">
                        <p><strong>Positive:</strong></p>
                        <ul>
                            <li v-for="item in ticket.interventionPositive" :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <p v-if="ticket.interventionGeneral?.length">
                        <strong>General (Positive & Negative):</strong>
                    </p>
                    <ul v-if="ticket.interventionGeneral?.length">
                        <li v-for="item in ticket.interventionGeneral" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <!-- RISK AREA -->
                <div class="modal-section">
                    <h3>Primary Risk Area of Event</h3>
                    <p>{{ ticket.primaryRiskArea }}</p>
                </div>

                <!-- NEGATIVE WHY -->
                <div class="modal-section" v-if="ticket.observationType === 'Negative'">
                    <h3>Why (Negative Only)</h3>
                    <p><strong>Why:</strong> {{ ticket.negativeWhy }}</p>
                    <p><strong>Why Detail:</strong> {{ ticket.negativeWhyDetail }}</p>
                </div>

                <!-- FOLLOW UP -->
                <div class="modal-section">
                    <h3>Follow Up</h3>
                    <p><strong>Follow up required?</strong> {{ ticket.followUpRequired ? 'Yes' : 'No' }}</p>
                    <p v-if="ticket.followUpDescription">
                        <strong>Description:</strong> {{ ticket.followUpDescription }}
                    </p>
                </div>

                <!-- PENDING: RESOLVE FORM -->
                <div class="modal-section" v-if="ticket.status === 'pending'">
                    <h3>Ticket Resolved?</h3>
                    <p class="modal-hint">
                        Add the action taken to resolve this ticket.
                    </p>
                    <textarea v-model="localAction" class="textarea" rows="3"
                        placeholder="Describe the corrective action taken..."></textarea>
                </div>

                <!-- RESOLVED INFO -->
                <div class="modal-section" v-if="ticket.status === 'resolved'">
                    <h3>Resolution</h3>
                    <p><strong>Action taken:</strong></p>
                    <p>{{ ticket.actionTaken }}</p>
                    <p v-if="ticket.resolvedAt">
                        <strong>Resolved at:</strong>
                        {{ new Date(ticket.resolvedAt).toLocaleString() }}
                    </p>
                </div>
            </section>

            <footer class="modal-footer">
                <button class="btn" @click="$emit('close')">Close</button>
                <button v-if="ticket?.status === 'pending'" class="btn btn-primary" :disabled="!localAction.trim()"
                    @click="emitResolve">
                    Mark as Resolved
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "TicketModal",
    props: {
        ticket: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            localAction: "",
        };
    },
    watch: {
        ticket: {
            immediate: true,
            handler() {
                this.localAction = "";
            },
        },
    },
    computed: {
        formattedDate() {
            if (!this.ticket?.date) return "";
            return new Date(this.ticket.date).toLocaleString();
        },
    },
    methods: {
        emitResolve() {
            if (!this.localAction.trim()) return;
            this.$emit("resolve", this.localAction.trim());
            this.localAction = "";
        },
    },
};
</script>
