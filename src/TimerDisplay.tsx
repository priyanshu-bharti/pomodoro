import React from "react";

interface TimerDisplayProps {
    label: string;
    children: React.ReactNode;
    rest: number;
    isResting: boolean;
}

const TimerDisplay = ({
    children,
    rest,
    label = "Task label goes here...",
    isResting,
}: TimerDisplayProps) => {
    return (
        <>
            <p className="text-xl text-center">
                {!isResting && <span className="">Current Task: </span>}
                <span className={"font-bold " + `${isResting ? "text-yellow-300" : "text-purple-300"}` }>{label}</span>
            </p>

            {children}

            <p className="text-xs">
                Resting Time:{" "}
                <span className="text-yellow-300 font-bold">
                    {rest} minutes
                </span>
            </p>
        </>
    );
};

export default TimerDisplay;
