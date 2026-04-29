import mongoose from "mongoose"

function connectToDatabase() {
   mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/codecrew")
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error)
        })
}

export default connectToDatabase

