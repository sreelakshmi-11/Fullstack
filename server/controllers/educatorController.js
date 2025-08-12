import { clerkClient } from "@clerk/express";

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated" });
    }
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });
    res.json({ success: true, message: "you can publish a course now" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default updateRoleToEducator;
