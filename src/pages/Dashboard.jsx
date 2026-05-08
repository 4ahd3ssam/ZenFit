import { useAuthStore } from "../store/authStore";

export const Dashboard = () => {
    const { user } = useAuthStore();
    return (
        <>
            <p>Welcome, {user?.name}!</p>
        </>
    )
}