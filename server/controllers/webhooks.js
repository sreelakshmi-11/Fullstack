// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkWebhooks = async (req, res) => {
//   try {
//     // Get raw payload as string
//     const payload = req.body.toString("utf8");
//     console.log(payload);
//     // Verify signature
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     await whook.verify(payload, {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     // Now parse the JSON manually
//     const { data, type } = JSON.parse(payload);
//     console.log("Incoming webhook:", req.body.toString());
//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses?.[0]?.email_address || "",
//           name: (data.first_name || "") + " " + (data.last_name || ""),
//           imageUrl: data.image_url || "",
//         };
//         const user = await User.create(userData);
//         console.log("User created:", user);
//         return res.json({});
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses?.[0]?.email_address || "",
//           name: (data.first_name || "") + " " + (data.last_name || ""),
//           imageUrl: data.image_url || "",
//         };
//         const user = await User.findByIdAndUpdate(data.id, userData, {
//           new: true,
//         });
//         console.log("User updated:", user);
//         return res.json({});
//       }

//       case "user.deleted": {
//         const user = await User.findByIdAndDelete(data.id);
//         console.log("User deleted:", user);
//         return res.json({});
//       }

//       default:
//         return res
//           .status(400)
//           .json({ success: false, message: "Unhandled event type" });
//     }
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;

// controllers/webhooks.js
import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  console.log("📩 Clerk webhook received");

  try {
    // 1️⃣ Convert raw buffer to string
    const payloadString = req.body.toString("utf8");
    console.log("🔹 Raw payload string:", payloadString);

    // 2️⃣ Verify signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("✅ Signature verified");
    console.log("📦 Event data:", evt);

    // 3️⃣ Handle events you care about
    if (evt.type === "user.created") {
      console.log("👤 Creating user in DB...");

      try {
        await User.create({
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0]?.email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
        });
        console.log("✅ User saved to DB");
      } catch (dbErr) {
        console.error("❌ DB save failed:", dbErr.message);
      }
    }

    if (evt.type === "user.updated") {
      console.log("👤 Updating user in DB...");
      // You can handle updates here
    }
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
  }

  // 4️⃣ Always respond 200 so Clerk stops retrying
  res.status(200).json({ received: true });
};

export default clerkWebhooks;
