<!-- src/pages/Tickets.vue -->
<template>
    <div class="tickets-page">
        <h2>Tickets</h2>
        <p class="tickets-description">
            Tickets are created from submissions that require follow-up. Pending tickets appear on the left,
            resolved tickets on the right.
        </p>

        <div class="tickets-columns">
            <!-- PENDING -->
            <section class="tickets-column">
                <h3>Pending Tickets</h3>
                <p class="tickets-column-subtitle">
                    Follow-up required. Click a ticket to view full submission details and resolve it.
                </p>

                <div v-if="pendingTickets.length === 0" class="tickets-empty">
                    No pending tickets.
                </div>

                <div v-for="ticket in pendingTickets" :key="ticket.id" class="ticket-card" @click="openTicket(ticket)">
                    <div class="ticket-header">
                        <span class="ticket-id">{{ ticket.submissionId }}</span>
                        <span class="ticket-tag ticket-tag-pending">Pending</span>
                    </div>
                    <p class="ticket-followup">
                        {{ ticket.followUpDescription }}
                    </p>
                    <p class="ticket-meta">
                        From {{ ticket.name }} · {{ formatDate(ticket.date) }}
                    </p>
                </div>
            </section>

            <!-- RESOLVED -->
            <section class="tickets-column">
                <h3>Tickets Resolved</h3>
                <p class="tickets-column-subtitle">
                    These tickets have been resolved. Click to view full details.
                </p>

                <div v-if="resolvedTickets.length === 0" class="tickets-empty">
                    No resolved tickets yet.
                </div>

                <div v-for="ticket in resolvedTickets" :key="ticket.id" class="ticket-card" @click="openTicket(ticket)">
                    <div class="ticket-header">
                        <span class="ticket-id">{{ ticket.submissionId }}</span>
                        <span class="ticket-tag ticket-tag-resolved">Resolved</span>
                    </div>
                    <p class="ticket-followup">
                        {{ ticket.actionTaken }}
                    </p>
                    <p class="ticket-meta">
                        From {{ ticket.name }} · Resolved
                        {{ ticket.resolvedAt ? formatDateTime(ticket.resolvedAt) : '—' }}
                    </p>
                </div>
            </section>
        </div>

        <TicketModal v-if="selectedTicket" :ticket="selectedTicket" @close="selectedTicket = null"
            @resolve="handleResolve" />
    </div>
</template>

<script>
import TicketModal from "../components/TicketModal.vue";

export default {
    name: "Tickets",
    components: { TicketModal },
    data() {
        return {
            // Dummy ticket data for now; later this will come from API
            tickets: [
                {
                    id: 1,
                    submissionId: "TAGUR-010",
                    date: "2025-11-22T09:30:00Z",
                    name: "Ali bin Ahmad",
                    observationType: "Negative",
                    interventionPositive: [],
                    interventionGeneral: ["Hands Free Rules"],
                    primaryRiskArea: "Struck by moving objects or machinery",
                    negativeWhy: "Mistake",
                    negativeWhyDetail: "Mistake: Insufficient HSE Coaching/Training",
                    followUpRequired: true,
                    followUpDescription: "Operator not following hands-free rules during lifting.",
                    status: "pending",
                    actionTaken: null,
                    resolvedAt: null,
                },
                {
                    id: 2,
                    submissionId: "TAGUR-011",
                    date: "2025-11-22T11:10:00Z",
                    name: "Siti binti Muhammad",
                    observationType: "Positive",
                    interventionPositive: ["Compliance"],
                    interventionGeneral: ["PAUSE"],
                    primaryRiskArea: "Road transport",
                    negativeWhy: null,
                    negativeWhyDetail: null,
                    followUpRequired: true,
                    followUpDescription: "Need to confirm if new PAUSE briefing is fully understood.",
                    status: "pending",
                    actionTaken: null,
                    resolvedAt: null,
                },
                {
                    id: 3,
                    submissionId: "TAGUR-012",
                    date: "2025-11-21T16:20:00Z",
                    name: "Ahmad bin Yusuf",
                    observationType: "Negative",
                    interventionPositive: [],
                    interventionGeneral: ["Process Safety Fundamentals"],
                    primaryRiskArea: "Process safety",
                    negativeWhy: "Not Aware",
                    negativeWhyDetail: "Not Aware: Not Informed",
                    followUpRequired: true,
                    followUpDescription: "No awareness of recent process safety update.",
                    status: "resolved",
                    actionTaken: "Conducted toolbox talk and updated shift handover checklist.",
                    resolvedAt: "2025-11-22T08:15:00Z",
                },
            ],
            selectedTicket: null,
        };
    },
    computed: {
        pendingTickets() {
            return this.tickets.filter((t) => t.status === "pending");
        },
        resolvedTickets() {
            return this.tickets.filter((t) => t.status === "resolved");
        },
    },
    methods: {
        openTicket(ticket) {
            this.selectedTicket = { ...ticket };
        },
        handleResolve(actionText) {
            if (!this.selectedTicket) return;

            const id = this.selectedTicket.id;
            const ticket = this.tickets.find((t) => t.id === id);
            if (!ticket) return;

            ticket.status = "resolved";
            ticket.actionTaken = actionText;
            ticket.resolvedAt = new Date().toISOString();

            this.selectedTicket = null;
        },
        formatDate(iso) {
            if (!iso) return "";
            return new Date(iso).toLocaleDateString();
        },
        formatDateTime(iso) {
            if (!iso) return "";
            return new Date(iso).toLocaleString();
        },
    },
};
</script>
