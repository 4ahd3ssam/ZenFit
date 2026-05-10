import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuthStore()

    if (!user) {
        return <Navigate to="/login" replace />
    }
    else {
        return children
    }
}