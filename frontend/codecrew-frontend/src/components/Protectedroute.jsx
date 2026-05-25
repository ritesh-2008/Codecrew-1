import { Navigate } from "react-router-dom";
import useauth from "../hooks/usehook";

export default function ProtectedRoute({children}){
    const {loading, token} = useauth();
    if (loading) return <div>loading......</div>
    return token? children : <Navigate to="/login" replace />
}