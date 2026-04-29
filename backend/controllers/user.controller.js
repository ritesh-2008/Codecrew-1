import User from "../model/user.js"

export const getCurrentUser = async (req, res) => {
    try {
        // Debug logs to help Postman testing
        console.log('[User] /user/me called. Authorization header snippet:', (req.headers.authorization || '<none>').toString().substring(0,50) + '...')
        console.log('[User] req.user:', req.user)

        // Defensive check: ensure auth middleware set req.user
        if (!req.user || !req.user.userId) {
            console.warn('[User] Missing req.user or userId')
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching current user:", error);
        console.error("[User] Exception details:", error.message, error.stack)
        res.status(500).json({ success: false, message: "Error fetching user" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const requestingUser = req.user.userId 
        if (requestingUser.toString()!== userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" })
        }
        const user = await User.findById(userId)
        if (user) {
            res.json({ success: true, user })
        } else {
            res.status(404).json({ success: false, message: "User not found" })
        }
    } catch (error) {
        console.error("Error fetching user:", error)
        res.status(500).json({ success: false, message: "Error fetching user" })
    }
}               

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json({ success: true, users })
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({ success: false, message: "Error fetching users" })
    }
}   