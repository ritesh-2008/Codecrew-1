import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const useauth = () => {
    useContext(AuthContext);
}

export default useauth;