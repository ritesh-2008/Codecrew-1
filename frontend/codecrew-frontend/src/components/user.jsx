import { useEffect } from "react";
import api from "../api/axios;"

export default function User() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const getuser = async () => {
                const response = await api.get("/user/me");
                setUser(response.data);
            };
            getuser();
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}