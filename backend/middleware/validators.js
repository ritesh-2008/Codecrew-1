import { body, param, validationResult } from "express-validator"

function isValidObjectId(id) {
    return /^[0-9a-f]{24}$/i.test(id)
}

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
}

export const validateRegistration = [
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("skills").optional().isArray().withMessage("Skills must be an array"),
    body("location").optional().isObject().withMessage("Location must be an object"),
    handleValidationErrors
]

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors
]

export const validateObjectId = [
    param("id").custom(value => {
        if (!isValidObjectId(value)) throw new Error("Invalid ID format")
        return true
    }),
    handleValidationErrors
]