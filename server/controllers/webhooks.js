import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Clerk sends the payload as raw JSON, so stringify for verification
    const payload = JSON.stringify(req.body);

    // Verify webhook signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Parse the event
    const { data, type } = JSON.parse(payload);
    console.log("Incoming webhook:", type, data.id);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email:
            data.email_addresses?.[0]?.email_address ||
            `${data.id}@placeholder.local`,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };

        const user = await User.create(userData);
        console.log("User created:", user);
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };

        const user = await User.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          { new: true, upsert: true }
        );

        console.log("User updated:", user);
        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        const user = await User.findOneAndDelete({ clerkId: data.id });
        console.log(" User deleted:", user);
        return res.status(200).json({ success: true });
      }

      default:
        console.warn("⚠️ Unhandled event type:", type);
        return res.status(400).json({
          success: false,
          message: `Unhandled event type: ${type}`,
        });
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
