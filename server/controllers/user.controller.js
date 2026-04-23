import User from "../models/user.model.js"


export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`failed to get currentUser ${error}`})
    }
}

// Temporary endpoint to make yourself admin (for first time setup)
export const makeAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: `${email} is now admin`, user });
    } catch (error) {
        return res.status(500).json({ message: `Failed ${error}` });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // Check if current user is admin
        const currentUser = await User.findById(req.userId);
        if (!currentUser || currentUser.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const users = await User.find()
            .sort({ createdAt: -1 })
            .select("name email credits role createdAt");

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: `Failed to get users ${error}` });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        // Check if current user is admin
        const currentUser = await User.findById(req.userId);
        if (!currentUser || currentUser.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const { role } = req.body;
        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("name email credits role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Failed to update role ${error}` });
    }
}