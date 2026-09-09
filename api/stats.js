// api/stats.js
import clientPromise from "./_lib/mongodb.js";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("tagur_dashboard"); // <-- use the DB name you created
    const col = db.collection("submissions");

    const totalSubmissions = await col.countDocuments({});
    const positive = await col.countDocuments({ observationType: "Positive" });
    const negative = await col.countDocuments({ observationType: "Negative" });

    const workRelated = await col.countDocuments({ workRelated: true });
    const nonWorkRelated = await col.countDocuments({ workRelated: false });

    const ticketsTotal = await col.countDocuments({ followUpRequired: true });
    const ticketsResolved = await col.countDocuments({ ticketStatus: "resolved" });

    return res.status(200).json({
      totalSubmissions,
      observationType: { Positive: positive, Negative: negative },
      workRelatedCounts: {
        WorkRelated: workRelated,
        NonWorkRelated: nonWorkRelated,
      },
      tickets: {
        total: ticketsTotal,
        resolved: ticketsResolved,
      },
    });
  } catch (err) {
    console.error("[/api/stats] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
