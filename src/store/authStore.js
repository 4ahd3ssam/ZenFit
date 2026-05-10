import { create } from "zustand"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";


export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: async () => {
        try {
            await signOut(auth);
        }
        catch (err) {
            console.error(err);
        }
    },
}))