import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const { username, password, email, skills, location } = req.body
    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: "Missing required fields" })
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 chars" })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(`[Register] Hashed password for ${email}:`, hashedPassword)

        const adduser = new User({ username, password: hashedPassword, email, skills, location })
        await adduser.save()

        console.log(`[Register] User registered successfully: ${email}`)
        res.json({ success: true, message: "User registered successfully" })
    } catch (error) {
        console.error("[Register] Error registering user:", error.message)
        res.status(500).json({ success: false, message: "Error registering user: " + error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" })
    }

    try {
        console.log(`[Login] Attempt for email: ${email}`)

        // Debug: Check if JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            console.error("[Login] JWT_SECRET is not set in .env")
            return res.status(500).json({ success: false, message: "Server configuration error" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            console.warn(`[Login] User not found: ${email}`)
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }

        console.log(`[Login] User found: ${email}, stored password hash:`, user.password.substring(0, 20) + "...")

        const isValid = await bcrypt.compare(password, user.password)
        console.log(`[Login] Password match result: ${isValid}`)

        if (isValid) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || "1d" })
            console.log(`[Login] Login successful for: ${email}`)
            res.json({ success: true, message: "Login successful", token })
        } else {
            console.warn(`[Login] Password mismatch for user: ${email}`)
            res.status(401).json({ success: false, message: "Invalid email or password" })
        }

    } catch (error) {
        console.error("[Login] Error during login:", error.message)
        console.error("[Login] Full error:", error)
        res.status(500).json({ success: false, message: "Error during login: " + error.message })
    }
}
