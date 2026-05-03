import Project from "../model/project.js"

export const createProject = async (req, res) => {
    console.log("[Project] Received project creation request with data:", req.body)
    // Log auth header snippet for debugging (do NOT log full tokens in production)
    const authHeader = req.headers.authorization || "<none>"
    console.log("[Project] Authorization header snippet:", authHeader ? authHeader.toString().substring(0, 50) + "..." : "<none>")
    console.log("[Project] req.user:", req.user)
       try {
                const { title, description, skills, location } = req.body

                if (!title || !description || !skills) {
                    return res.status(400).json({ success: false, message: "All fields are required" })
                }

                // Ensure we have an authenticated user from the auth middleware
                const userId = req.user?.userId
                if (!userId) {
                    return res.status(401).json({ success: false, message: "Unauthorized" })
                }

                // Create project and attach creator
                const newProject = new Project({
                    title,
                    description,
                    skills,
                    location,
                    creator: [userId]
                })

                const savedProject = await newProject.save()
                res.json({ success: true, message: "Project created successfully", project: savedProject })
        } catch (error) {
            console.error("Error creating project:", error)
            res.status(500).json({ success: false, message: "Error creating project" })
        }
    }

export const getProjects = async (req, res) => {
       try {
            const projects = await Project.find()
            res.json({ success: true, projects })
        } catch (error) {
            console.error("Error fetching projects:", error)
            res.status(500).json({ success: false, message: "Error fetching projects" })
        }
    }

export const getProjectById = async (req, res) => {
     try {
            const project = await Project.findById(req.params.id)
            if (project) {
                res.json({ success: true, project })
            } else {
                res.status(404).json({ success: false, message: "Project not found" })
            }
        } catch (error) {
            console.error("Error fetching project:", error)
            res.status(500).json({ success: false, message: "Error fetching project" })
        }
    }

export const joinProject = async (req, res) => {
const projectId = req.params.id
const userId = req.user.userId

try {
    const project = await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { members: userId } },
        { returnDocument: "after"}
    )
    if (project) {
        res.json({ success: true, message: "Joined project successfully" })
    } else {
        res.status(404).json({ success: false, message: "Project not found" })
    }
} catch (error) {
    console.error("Error joining project:", error)
    res.status(500).json({ success: false, message: "Error joining project" })
}
}   