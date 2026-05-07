import { NavigationBar } from "../components/layout/NavigationBar"
import { PageLayout } from "../components/layout/PageLayout"
import { Card } from "../components/common/Card"
import { Input } from "../components/common/Input"
import { Label } from "../components/common/Label"
import { Flame } from "lucide-react"
import { FavIcon } from "../components/common/FavIcon"
import { DropDown } from "../components/common/DropDown"
import { Button } from "../components/common/Button"
import {Link } from "react-router-dom"

export const Signup = () => {
    return (
        <>
            <NavigationBar />
            <PageLayout>
                <div className="flex items-center justify-center py-10">
                    <Card className="px-10 py-8">
                        <div className="mb-6 flex items-center gap-3">
                            <FavIcon />
                            <div>
                                <h1 className="font-display text-2xl font-bold">Create your account</h1>
                                <p className="text-sm text-muted-foreground">Start forging your fitness today.</p>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" className="" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" />
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
                                    />
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
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-gradient-to-br to-orange-400 from-orange-600 
                            dark:to-orange-500 dark:from-orange-700 dark:text-zinc-950 shadow-glow hover:cursor-pointer">Create account</Button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-zinc-400">
                            Already a member? <Link to="/login" className="font-medium text-orange-500 hover:underline">Log in</Link>
                        </p>
                    </Card>
                </div>
            </PageLayout>
        </>

    )
}