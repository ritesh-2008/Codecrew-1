import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" })
    } else {
        try {
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

            // For debugging: log a short snippet of the token (do NOT log full token in production)
            console.log("[Auth] Verifying token snippet:", token ? token.substring(0, 20) + "..." : "<none>")

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()

        } catch (error) {
            console.error("[Auth] Token verification failed:", error && error.message)
            // Optionally log the token to debug formatting issues (truncated)
            // console.error("[Auth] Raw token:", authHeader)
            return res.status(401).json({ success: false, message: "Invalid token" })
        }
    }
}
export default authMiddleware