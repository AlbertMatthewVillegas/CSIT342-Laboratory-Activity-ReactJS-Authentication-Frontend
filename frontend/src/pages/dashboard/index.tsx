
function Dashboard() {

    return (
        <div className="min-h-screen  text-black">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <header className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em]">
                            Welcome back
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                            Dashboard
                        </h1>
                    </div>

                    <a href="/">logout</a>

                </header>
            </div>
        </div>
    )
}

export default Dashboard
