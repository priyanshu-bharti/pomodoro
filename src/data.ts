export interface TaskEntry {
    id: string;
    label: string;
    minutes: number;
    seconds: number;
}

export const dummyTasksData: TaskEntry[] = [
    { id: "1", label: "Decide project title", minutes: 0, seconds: 5 },
    {
        id: "2",
        label: "Plan Features and Requirements",
        minutes: 0,
        seconds: 4,
    },
    {
        id: "3",
        label: "Choose tech-stack and librarires for the project",
        minutes: 0,
        seconds: 3,
    },
    { id: "4", label: "Start project development", minutes: 0, seconds: 2 },
];
