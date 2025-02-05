import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    if (loading) {
        return <span className="loading loading-ring loading-lg"></span>
    }
    if (user) {
        return children
    }

    return <Navigate to="/login"></Navigate>
   
};

export default PrivetRoute;