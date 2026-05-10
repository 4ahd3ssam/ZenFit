import { NavigationBar } from "../components/layout/NavigationBar"
import { PageLayout } from "../components/layout/PageLayout"
import { Card } from "../components/common/Card"
import { DropDown } from "../components/common/DropDown"
import { Label } from "../components/common/Label"
import { useAuthStore } from "../store/authStore"
import { useState } from "react"
import { Button } from "../components/common/Button"
import { Sparkles, Trophy, Dumbbell } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckBox } from "../components/common/CheckBox"
import { fetchExercises, FALLBACK_EXERCISES } from "../services/exersiceService"


export const Workout = () => {
    const [filters, setFilters] = useState({
        goal: "maintain",
        duration: "15",
        equipment: "home"
    });
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const onGenerateWorkout = async () => {
        setLoading(true);
        try {
            const fetchedData = await fetchExercises({
                equipment: filters.equipment,
            });
            let filtered = fetchedData;

            if (filters.goal === "lose") {
                filtered = filtered.filter((e) =>
                    /cardio|full body|abs/i.test(e.muscle)
                );
            }
            if (filters.goal === "gain") {
                filtered = filtered.filter((e) =>
                    /chest|back|arms|legs/i.test(e.muscle)
                );
            }

            const limit = parseInt(filters.duration) / 5;
            filtered = filtered.slice(0, limit);
            if (filtered.length == 0) {
                setExercises(FALLBACK_EXERCISES);
            } else {
                setExercises(filtered);
            }
            setLoading(false);
        }
        catch (err) {
            console.error(err);
            setError("Error while generating a plan, please try again.");
            setLoading(false)
        }
    }

    return (
        <>
            <NavigationBar />
            <section className="bg-gray-50 dark:bg-zinc-950 pt-[64.8px] min-h-screen">
                <PageLayout className={"py-10"}>
                    <div>
                        <div className="mb-6">
                            <h1 className="font-space text-3xl font-bold md:text-4xl text-zinc-950 dark:text-white">Workout Generator</h1>
                            <p className="text-zinc-600 dark:text-zinc-400">Personalized exercises in seconds.</p>
                        </div>
                    </div>
                    <Card className="border-border/60 p-6 md:p-8">
                        <div className="grid gap-4 md:grid-cols-3 font-inter">
                            <div className="space-y-2">
                                <Label htmlFor="goal">Goal</Label>
                                <DropDown
                                    id="goal"
                                    value={filters.goal}
                                    options={[
                                        { label: "Lose weight", value: "lose" },
                                        { label: "Gain muscle", value: "gain" },
                                        { label: "Maintain", value: "maintain" },
                                    ]}
                                    onValueChange={(value) => { setFilters((prev) => ({ ...prev, goal: value })) }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <DropDown
                                    id="duration"
                                    value={filters.duration}
                                    options={[
                                        { label: "15 Minutes", value: "15" },
                                        { label: "30 Minutes", value: "30" },
                                        { label: "60 Minutes", value: "60" },
                                    ]}
                                    onValueChange={(value) => { setFilters((prev) => ({ ...prev, duration: value })) }}

                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="equipment">Equipment</Label>
                                <DropDown
                                    id="equipment"
                                    value={filters.equipment}
                                    options={[
                                        { label: "Home", value: "home" },
                                        { label: "Full GYM", value: "gym" },
                                    ]}
                                    onValueChange={(value) => { setFilters((prev) => ({ ...prev, equipment: value })) }}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button
                                disabled={loading}
                                onClick={() => { onGenerateWorkout() }}
                                className="bg-linear-br from-orange-500 to-zinc-800 text-white dark:text-zinc-900 shadow-sm font-medium"
                            >
                                <Sparkles className="mr-2 h-4 w-4" />

                                {loading ? "Building plan…" : "Generate workout"}
                            </Button>

                        </div>
                        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
                    </Card>

                    <AnimatePresence mode="wait">
                        {exercises.length != 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-8">
                                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                                    <div>
                                        <h2 className="font-space text-2xl font-bold text-zinc-900 dark:text-white">Today's plan</h2>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-inter">{exercises.length} exercises · {filters.duration} min · {filters.equipment}</p>
                                    </div>
                                    <Button
                                    className="bg-linear-br from-orange-500 to-zinc-800 text-white dark:text-zinc-950"
                                    // onClick={finish} disabled={!allDone} className={allDone ? "bg-gradient-hero text-primary-foreground shadow-glow" : ""}
                                    >
                                        <Trophy className="mr-2 h-4 w-4 font-inter" />Finish workout
                                    </Button>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 font-inter">
                                    {exercises.map((ex, idx) => (
                                        <motion.div
                                            key={ex.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Card className={`group h-full overflow-hidden border-border/60 transition-all ${ex.completed ? "opacity-60" : "hover:shadow-card"}`}>
                                                {ex.image ? (
                                                    <div className="aspect-video overflow-hidden bg-zinc-900">
                                                        <img src={ex.image} alt={ex.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                                                    </div>
                                                ) : (
                                                    <div className="flex aspect-video items-center justify-center bg-gradient-dark">
                                                        <Dumbbell className="h-12 w-12 text-primary opacity-60" />
                                                    </div>
                                                )}
                                                <div className="p-5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h3 className="font-display text-lg font-semibold leading-tight font-space">{ex.name}</h3>
                                                            <p className="text-xs uppercase tracking-wider text-orange-500">{ex.muscle}</p>
                                                        </div>
                                                        <CheckBox checked={ex.completed} onCheckedChange={() => {}} />
                                                    </div>
                                                    <div className="mt-3 flex gap-3 text-xs">
                                                        <span className="rounded-md bg-zinc-200 dark:bg-zinc-950 px-2 py-1 font-medium">{ex.sets} sets</span>
                                                        <span className="rounded-md bg-zinc-200 dark:bg-zinc-950 px-2 py-1 font-medium">{ex.reps} reps</span>
                                                    </div>
                                                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{ex.description}</p>
                                                    {ex.completed && (
                                                        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-success"><CheckCircle2 className="h-3.5 w-3.5" />Completed</p>
                                                    )}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {exercises.length == 0 && !loading && (
                        <Card className="mt-8 border-dashed bg-card/40 p-10 text-center">
                            <Dumbbell className="mx-auto h-10 w-10 text-zinc-500 dark:text-zinc-400" />
                            <p className="mt-3 text-zinc-500 dark:text-zinc-400">No active workout. Generate one above to get started.</p>
                        </Card>
                    )}
                </PageLayout>
            </section>
        </>
    )
}