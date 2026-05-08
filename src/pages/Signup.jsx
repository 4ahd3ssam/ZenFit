import { NavigationBar } from "../components/layout/NavigationBar"
import { PageLayout } from "../components/layout/PageLayout"
import { Card } from "../components/common/Card"
import { Input } from "../components/common/Input"
import { Label } from "../components/common/Label"
import { Flame } from "lucide-react"
import { FavIcon } from "../components/common/FavIcon"
import { DropDown } from "../components/common/DropDown"
import { Button } from "../components/common/Button"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ToastMessage } from "../components/common/ToastMessage"
import { modalTheme } from "flowbite-react"
import { getDoc } from "firebase/firestore"
import { motion } from "framer-motion"


export const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        goal: "",
        level: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState({
        formSignup: false,
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setLoading((prev) => ({ ...prev, formSignup: true }));
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name: form.name,
                email: form.email,
                goal: form.goal,
                level: form.level,
                createdAt: new Date(),
            });
            setLoading((prev) => ({ ...prev, formSignup: false }));
            setToastMessage("Account created successfully!");
            setShowToast(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            console.error(error.message);
            setToastMessage("Error creating account, please try again.");
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
            setToastMessage(isNewUser
                ? "Account created successfully!"
                : "You already have an account, welcome back!");
            setShowToast(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            console.error(error.message);
            setToastMessage("Error creating account, please try again.");
            setShowToast(true);
        }
    };
    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!form.email.includes("@")) {
            newErrors.email = "Enter a valid email";
        }
        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!form.goal) {
            newErrors.goal = "Please select a goal";
        }
        if (!form.level) {
            newErrors.level = "Please select a level";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <NavigationBar />
            <PageLayout className={"pt-[64.8px] min-h-screen bg-gray-50 dark:bg-zinc-950"}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} className="flex items-center justify-center py-3">
                    <Card className="px-10 py-8">
                        <div className="mb-6 flex items-center gap-3">
                            <FavIcon />
                            <div>
                                <h1 className="text-2xl font-space font-bold">Create your account</h1>
                                <p className="text-sm font-inter text-gray-500 dark:text-gray-300">Start forging your fitness today.</p>
                            </div>
                        </div>
                        <form className="space-y-4 font-inter">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" onChange={handleChange} />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" onChange={handleChange} />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" onChange={handleChange} />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full">
                                    <Label htmlFor="goal">Goal</Label>

                                    <DropDown
                                        id="goal"
                                        options={[
                                            { label: "Lose weight", value: "lose" },
                                            { label: "Gain muscle", value: "gain" },
                                            { label: "Maintain", value: "maintain" },
                                        ]}
                                        onValueChange={(value) =>
                                            setForm({ ...form, goal: value })
                                        }
                                    />
                                    {errors.goal && (
                                        <p className="text-red-500 text-xs mt-1">{errors.goal}</p>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="level">Level</Label>
                                    <DropDown
                                        id="level"
                                        options={[
                                            { label: "Beginner", value: "beginner" },
                                            { label: "Intermediate", value: "intermediate" },
                                            { label: "Advanced", value: "advanced" },
                                        ]}
                                        onValueChange={(value) =>
                                            setForm({ ...form, level: value })
                                        }
                                    />
                                    {errors.level && (
                                        <p className="text-red-500 text-xs mt-1">{errors.level}</p>
                                    )}
                                </div>
                            </div>

                            <Button onClick={handleSubmit} className="w-full bg-gradient-to-br to-orange-400 from-orange-600 
                            dark:to-orange-500 dark:from-orange-700 dark:text-zinc-950 shadow-glow hover:cursor-pointer">

                                Create account
                                {loading.formSignup && <Loader2 className="animate-spin w-5 h-5" />}
                            </Button>
                        </form>
                        <p
                            className="mt-2
                            w-full flex items-center justify-center gap-3
                            rounded-lg px-4 py-2
                            border border-gray-300 dark:border-zinc-700
                            bg-white dark:bg-zinc-900
                            text-gray-700 dark:text-zinc-200
                            hover:bg-gray-50 dark:hover:bg-zinc-800
                            active:scale-[0.98]
                            transition
                            shadow-sm"
                            onClick={handleGoogle}
                        >
                            <FcGoogle size={20} /> Continue with Google
                            {loading.google && <Loader2 className="animate-spin w-5 h-5" />}

                        </p>
                        <p className="mt-4 text-center text-sm text-gray-600 font-medium dark:text-zinc-400">
                            Already a member? <Link to="/login" className="text-orange-500 hover:underline">Log in</Link>
                        </p>
                    </Card>
                </motion.div>
                {showToast && <ToastMessage message={toastMessage} />}

            </PageLayout>
        </>

    )
}