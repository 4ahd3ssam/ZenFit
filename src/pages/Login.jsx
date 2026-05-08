import { NavigationBar } from "../components/layout/NavigationBar";
import { PageLayout } from "../components/layout/PageLayout";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Label } from "../components/common/Label";
import { Button } from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import {
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ToastMessage } from "../components/common/ToastMessage";
import { FavIcon } from "../components/common/FavIcon";



export const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState({
        login: false,
        google: false,
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const validate = () => {
        const newErrors = {}
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!form.password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setLoading((prev) => ({ ...prev, login: true }));
            await signInWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            setLoading((prev) => ({ ...prev, login: false }));
            setToastMessage("Welcome back!");
            setShowToast(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (error) {
            console.error(error.message);
            setLoading((prev) => ({ ...prev, login: false }));
            setToastMessage("Invalid email or password, please try again.");
            setShowToast(true);
        }
    };
    const handleGoogle = async () => {
        try {
            setLoading((prev) => ({ ...prev, google: true }));
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            let isNewUser = false;
            if (!userSnap.exists()) {
                isNewUser = true;
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    goal: "",
                    level: "",
                    createdAt: new Date(),
                });
            }
            setLoading((prev) => ({ ...prev, google: false }));
            setToastMessage(
                isNewUser
                    ? "Account created with Google!"
                    : "Welcome back!"
            );
            setShowToast(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {
            console.error(error.message);
            setLoading((prev) => ({ ...prev, google: false }));
            setToastMessage("Google login failed, please try again.");
            setShowToast(true);
        }
    };

    return (
        <>
            <NavigationBar />
            <PageLayout>
                <div className="flex items-center justify-center py-3">
                    <Card className="px-10 py-8">
                        <div className="mb-6 flex items-center gap-3">
                            <FavIcon />
                            <div>
                                <h1 className="text-2xl font-space font-bold">
                                    Welcome back
                                </h1>
                                <p className="text-sm font-inter text-gray-500 dark:text-gray-300">
                                    Login to continue your fitness journey.
                                </p>
                            </div>
                        </div>
                        <form className="space-y-4 font-inter">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" onChange={handleChange} />
                                {errors.email && (
                                    <p className="text-red-500 text-xs">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={handleLogin}
                                className="w-full bg-gradient-to-br to-orange-400 from-orange-600
                                dark:to-orange-500 dark:from-orange-700
                                dark:text-zinc-950 shadow-glow"
                            >
                                Login
                                {loading.login && (
                                    <Loader2 className="animate-spin w-5 h-5 ml-2" />
                                )}
                            </Button>
                        </form>
                        <p
                            onClick={handleGoogle}
                            className="
                                mt-3 w-full flex items-center justify-center gap-3
                                rounded-lg px-4 py-2
                                border border-gray-300 dark:border-zinc-700
                                bg-white dark:bg-zinc-900
                                text-gray-700 dark:text-zinc-200
                                hover:bg-gray-50 dark:hover:bg-zinc-800
                                cursor-pointer transition
                            "
                        >
                            <FcGoogle size={20} />
                            Continue with Google

                            {loading.google && (
                                <Loader2 className="animate-spin w-5 h-5" />
                            )}
                        </p>
                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-zinc-400 font-medium">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-orange-500 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </Card>
                </div>
                {showToast && (
                    <ToastMessage message={toastMessage} />
                )}
            </PageLayout>
        </>
    );
};