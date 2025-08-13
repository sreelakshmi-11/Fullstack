import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body); // Use req.rawBody if available

    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: (data.first_name || "") + " " + (data.last_name || ""),
          imageUrl: data.image_url || "",
        };
        const user = await User.create(userData);
        console.log("User created:", user);
        return res.json({});
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: (data.first_name || "") + " " + (data.last_name || ""),
          imageUrl: data.image_url || "",
        };
        const user = await User.findByIdAndUpdate(data.id, userData, {
          new: true,
        });
        console.log("User updated:", user);
        return res.json({});
      }

      case "user.deleted": {
        const user = await User.findByIdAndDelete(data.id);
        console.log("User deleted:", user);
        return res.json({});
      }

      default:
        return res
          .status(400)
          .json({ success: false, message: "Unhandled event type" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
