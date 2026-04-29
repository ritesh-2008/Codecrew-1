import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log("[Auth] Request to protected route")
    console.log("[Auth] Authorization header present:", !!authHeader)
    console.log("[Auth] Authorization header value:", authHeader ? authHeader.substring(0, 50) + "..." : "<none>")
    console.log("[Auth] JWT_SECRET exists:", !!process.env.JWT_SECRET)

    if (!authHeader) {
        console.warn("[Auth] BLOCKED: No authorization header")
        return res.status(401).json({ success: false, message: "No token provided" })
    } else {
        try {
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

            // For debugging: log a short snippet of the token (do NOT log full token in production)
            console.log("[Auth] Token extracted, snippet:", token ? token.substring(0, 20) + "..." : "<none>")

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log("[Auth] Token verified successfully. User ID:", decoded.userId)
            req.user = decoded
            next()

        } catch (error) {
            console.error("[Auth] Token verification FAILED:", error && error.message)
            console.error("[Auth] Error type:", error && error.name)
            return res.status(401).json({ success: false, message: "Invalid token", error: error.message })
        }
    }
}
export default authMiddleware