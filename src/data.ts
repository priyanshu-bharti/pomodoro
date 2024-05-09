export interface TaskEntry {
    id: string;
    label: string;
    seconds: number;
}

export const dummyTasksData: TaskEntry[] = [
    { id: "1", label: "Decide project title", seconds: 5 },
    {
        id: "2",
        label: "Plan Features and Requirements",
        seconds: 4,
    },
    {
        id: "3",
        label: "Choose tech-stack and librarires for the project",

        seconds: 3,
    },
    { id: "4", label: "Start project development", seconds: 2 },
];
