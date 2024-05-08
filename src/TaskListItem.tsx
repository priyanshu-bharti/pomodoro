interface TaskListItemProps {
    label: string;
    minutes: number;
    seconds: number;
    handleDelete: (id: string) => void;
    handleSort: () => void;
    dragTask: React.MutableRefObject<number>;
    draggedOverTask: React.MutableRefObject<number>;
    index: number;
    id: string;
}

const TaskListItem = ({
    handleDelete = () => {},
    handleSort = () => {},
    minutes = 20,
    seconds = 35,
    label = "Task name here",
    dragTask,
    draggedOverTask,
    index,
    id,
}: TaskListItemProps) => {
    const timerMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const timerSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
        <li
            className="flex items-center justify-center cursor-grab active:bg-black/60"
            draggable
            onDragStart={() => (dragTask!.current = index)}
            onDragEnter={() => {
                draggedOverTask!.current = index;
            }}
            onDragEnd={() => handleSort()}
            onDragOver={(e) => e.preventDefault()}
        >
            <p className="text-gray-500">⠇</p>
            <p className="flex-1 px-4">{label}</p>
            <p className="text-gray-500 px-4">
                {timerMinutes}m {timerSeconds}s
            </p>
            <button
                onClick={() => handleDelete(id)}
                className="rounded-md border border-red-500 bg-red-950 px-3 py-2"
            >
                ❌
            </button>
        </li>
    );
};

export default TaskListItem;
