import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { NavigationBar } from "../components/layout/NavigationBar";
import { PageLayout } from "../components/layout/PageLayout";
import { Flame, Sparkles, Activity, Bot, Dumbbell, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../components/common/Card";


export const Landing = () => {
    const { user } = useAuthStore();
    const features = [
        { icon: Dumbbell, title: "Smart Workout Generator", desc: "AI-curated routines based on your goal, time, and equipment." },
        { icon: Bot, title: "AI Fitness Coach", desc: "Ask anything — recovery, nutrition, form. Get instant answers." },
        { icon: LineChart, title: "Progress Dashboard", desc: "Track streaks, calories, and weekly volume with beautiful charts." },
        { icon: Activity, title: "Daily Habit Tracker", desc: "Build the system: water, sleep, stretching, workouts." },
    ];

    return (
        <>
            <NavigationBar />
            <section className="bg-linear-to-br from-gray-50 to-orange-400 dark:from-orange-950 dark:to-zinc-950">
                <PageLayout className="min-h-screen pt-[64.8px]">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-3xl text-center"
                        >
                            <div className="mb-6 inline-flex items-center gap-2 font-inter rounded-full border border-gray-50 bg-gray-50 px-4 py-1.5 text-xs font-medium dark:bg-zinc-950 dark:text-white dark:border-zinc-900" >
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Powered by AI · Free forever</span>
                            </div>
                            <h1 className="font-space text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl text-zinc-950 dark:text-white">
                                Forge your <span className="bg-linear-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">strongest</span> self.
                            </h1>
                            <p className="mx-auto mt-6 max-w-xl text-md md:text-lg font-inter text-zinc-950 dark:text-zinc-200">
                                Personalized workouts, an always-on AI coach, and progress tracking that actually keeps you coming back.
                            </p>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                                <Link to={user ? "/workout" : "/register"}>
                                    <Button size="lg" className="h-12 px-8 shadow-glow transition-transform hover:scale-105">
                                        <Flame className="mr-2 h-4 w-4" />
                                        {user ? "Generate workout" : "Start training free"}
                                    </Button>
                                </Link>
                                <Link to={user ? "/dashboard" : "/login"}>
                                    <Button size="lg" variant="outline" className="h-12 px-8">
                                        {user ? "Open dashboard" : "I have an account"}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </PageLayout>
            </section>
            <section className="py-10 bg-gray-50 dark:bg-zinc-950">
                <PageLayout>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                                <Card className="h-full p-6">
                                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-glow transition-transform">
                                        <f.icon className="rounded-2xl h-10 w-10 p-2 bg-linear-to-br from-orange-400 to-orange-600 
                                        dark:from-orange-500 dark:to-orange-700 text-white dark:text-zinc-950" />
                                    </div>
                                    <h3 className="font-space text-lg text-zinc-900 dark:text-white font-semibold">{f.title}</h3>
                                    <p className="mt-2 text-sm font-inter text-zinc-600 dark:text-gray-50">{f.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </PageLayout>
            </section>
            <section className="bg-gray-50 dark:bg-zinc-950">
                <PageLayout className={"py-10"}>
                    <Card className="overflow-hidden border-0 bg-linear-to-br from-orange-600 to-orange-400 p-10 text-center shadow-glow md:p-16">
                        <h2 className="font-space text-3xl font-bold text-white dark:text-zinc-950 md:text-5xl">Train smarter today.</h2>
                        <p className="text-inter mx-auto mt-3 max-w-md text-gray-50 dark:text-zinc-900">Join thousands building consistency with PulseForge.</p>
                        <Link to={user ? "/workout" : "/register"} className="mt-8 inline-block">
                            <Button size="lg" variant="ghost" className="h-12 px-8 text-inter bg-white hover:bg-gray-300 dark:bg-zinc-900 dark:hover:bg-zinc-700">
                                {user ? "Start a workout" : "Create your free account"}
                            </Button>
                        </Link>
                    </Card>
                </PageLayout>

            </section>
        </>
    )
}