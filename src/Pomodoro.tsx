const Pomodoro = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border border-neutral-700 bg-neutral-900 rounded-xl p-4 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Pomodoro Timer</h1>

            {children}
        </div>
    );
};

export default Pomodoro;
