export const PageLayout = ({ className, children }) => {
    return (
        <main className={`transition-all duration-200 flex items-center justify-center ${className || ''}`}>
            <div className="container mx-auto px-2 sm:px-4">
                {children}
            </div>
        </main>
    )
}