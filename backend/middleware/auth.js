import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
   
    if (!authHeader) {
        console.warn("[Auth] BLOCKED: No authorization header")
        return res.status(401).json({ success: false, message: "No token provided" })
    } else {
        try {
            const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

            // For debugging: log a short snippet of the token (do NOT log full token in production)
           

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
           
            req.user = decoded
            next()

        } catch (error) {
            
            return res.status(401).json({ success: false, message: "Invalid token", error: error.message })
        }
    }
}
export default authMiddleware