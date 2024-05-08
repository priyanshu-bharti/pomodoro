import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import Pomodoro from "./Pomodoro";
import Tasks from "./Tasks";
import { TaskEntry, dummyTasksData } from "./data";
import TaskList from "./TaskList";
import TaskListItem from "./TaskListItem";
import AddTaskForm from "./AddTaskForm";
import TaskListHeader from "./TaskListHeader";
import RestInput from "./RestInput";
import TimerDisplay from "./TimerDisplay";
import ControlButton from "./ControlButton";

export interface FormValues {
    minutes: number;
    seconds: number;
    label: string;
}

const App = () => {
    const [tasks, setTasks] = useState<TaskEntry[]>(dummyTasksData);
    const [rest, setRest] = useState<number>(5);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [isResting, setIsResting] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<TaskEntry | undefined>();

    useEffect(() => {
        if (tasks.length) {
            const task = tasks[0];
            setCurrentTask(task);
            setMinutes(task.minutes);
            setSeconds(task.seconds);
        }
    }, [tasks]);

    useEffect(() => {
        const pomodotoTimerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes((prev) => prev - 1);
                } else {
                    if (currentTask) {
                        if (!isResting) {
                            const mins = currentTask.minutes;
                            const secs = currentTask.seconds;
                            setSeconds(secs);
                            setMinutes(mins);
                        } else {
                            const mins = 0;
                            const secs = 9;
                            setSeconds(secs);
                            setMinutes(mins);
                        }
                        setIsResting((prev) => !prev);

                        if (tasks.length > 1) {
                            const tasksClone = tasks.slice(1);
                            const temp: TaskEntry = tasksClone[0];
                            setCurrentTask(temp);
                            setTasks(tasksClone);
                        } else {
                            const temp: TaskEntry = tasks[0];
                            setCurrentTask(temp);
                            setTasks([]);
                        }
                    }
                }
            } else {
                setSeconds((prev) => prev - 1);
            }
        }, 1000);
        return () => {
            clearInterval(pomodotoTimerInterval);
        };
    }, [seconds, minutes, isResting, currentTask, tasks]);

    const dragTask = useRef<number>(0);
    const draggedOverTask = useRef<number>(0);

    const form = useForm<FormValues>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    function handleTaskListSort() {
        let tasksClone = [...tasks];
        const temp = tasks.splice(dragTask.current, 1)[0];
        tasksClone = tasks.filter((task) => task.id !== temp.id);
        tasksClone.splice(draggedOverTask.current, 0, temp);
        setTasks(tasksClone);
    }

    function handleTaskDelete(id: string) {
        const tasksClone = tasks.filter((task) => task.id !== id);
        setTasks(tasksClone);
    }

    function handleAddTask(value: FormValues) {
        const newTask: TaskEntry = {
            id: uuid(),
            label: value.label,
            minutes: value.minutes,
            seconds: value.seconds,
        };
        setTasks((prevTasks) => prevTasks.concat(newTask));
    }

    function handleRestAmountChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setRest(parseInt(e.target.value));
    }

    function handleTimerRestart() {}

    function handleTimerPause() {}

    function handleTimerNextTask() {}

    const pomodoroMessage = (
        <p className="text-center max-w-96 text-xl">
            You currently don't have any task added, to start the pomodoro
            timer, add a task first
        </p>
    );

    const taskDisplayMessage = isResting
        ? "You are currently resting"
        : currentTask?.label;

    const timerMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const timerSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
        <div className="min-h-screen grid grid-cols-2 container mx-auto p-8 gap-12">
            <Tasks>
                <TaskListHeader>
                    <RestInput setRestAmount={handleRestAmountChange} />
                </TaskListHeader>
                <TaskList>
                    {tasks.map((task, index) => (
                        <TaskListItem
                            label={task.label}
                            handleSort={handleTaskListSort}
                            key={task.id}
                            minutes={task.minutes}
                            seconds={task.seconds}
                            dragTask={dragTask}
                            draggedOverTask={draggedOverTask}
                            index={index}
                            id={task.id}
                            handleDelete={handleTaskDelete}
                        />
                    ))}
                </TaskList>
                <AddTaskForm
                    register={register}
                    errors={errors}
                    onSubmit={handleSubmit(handleAddTask)}
                />
            </Tasks>
            <Pomodoro>
                <div className="flex flex-col flex-1 justify-center items-center gap-4">
                    {currentTask ? (
                        <>
                            <TimerDisplay
                                rest={rest}
                                label={taskDisplayMessage ?? "NA"}
                                isResting={isResting}
                            >
                                <h1 className="text-6xl font-bold">
                                    {timerMinutes}:{timerSeconds}
                                </h1>
                            </TimerDisplay>

                            <div className="flex gap-4 pt-4 text-2xl">
                                <ControlButton onClick={handleTimerRestart}>
                                    🔄
                                </ControlButton>
                                <ControlButton onClick={handleTimerPause}>
                                    ⏸️
                                </ControlButton>
                                <ControlButton onClick={handleTimerNextTask}>
                                    ⏭️
                                </ControlButton>
                            </div>
                        </>
                    ) : (
                        pomodoroMessage
                    )}
                </div>
            </Pomodoro>
        </div>
    );
};

export default App;
