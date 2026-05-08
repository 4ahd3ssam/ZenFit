export const PageLayout = ({ children }) => {
    return (
        <main className="pt-20 pb-8 bg-gray-50 dark:bg-zinc-950 min-h-screen transition-all duration-200">
            <div className="container mx-auto px-2 sm:px-4">
                {children}
            </div>
        </main>
    )


}