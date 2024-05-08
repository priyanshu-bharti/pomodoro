const TaskList = ({ children }: { children: React.ReactNode }) => {
    return <ul className="flex flex-col flex-1 gap-4">{children}</ul>;
};

export default TaskList;
