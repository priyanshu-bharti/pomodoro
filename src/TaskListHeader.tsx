import React from "react";

const TaskListHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex gap-4 items-end justify-between pb-8">
            <h1 className="text-4xl font-bold">All Tasks</h1>
            {children}
        </div>
    );
};

export default TaskListHeader;
