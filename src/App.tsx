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
import { secondsToMinutesAndSeconds } from "./helper";

export interface FormValues {
    minutes: number;
    seconds: number;
    label: string;
}

const App = () => {
    const [tasks, setTasks] = useState<TaskEntry[]>(dummyTasksData);
    const [rest, setRest] = useState<number>(5);
    const [seconds, setSeconds] = useState<number>(0);
    const [isResting, setIsResting] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<TaskEntry | undefined>();
    const [isTimerPaused,setIsTimerPaused] = useState<boolean> (false);   
    useEffect(() => {
        if (tasks.length) {
            const task = tasks[0];
            setCurrentTask(task);
        }
    }, [tasks]);

useEffect(()=>{
    const interval = setInterval(()=>{
        if(!isTimerPaused){
        if(!isResting){
            if(seconds>0){
                setSeconds(prev=>prev-1);
            }else if (seconds === 0){
                //TODO: Set Resting And Notify User for the Rest
                setIsResting(true)
                setSeconds(rest);
                const tasksClone = tasks.slice(1);
                setTasks(tasksClone)
                setCurrentTask(tasksClone[0])
                clearInterval(interval)
            }
        }else{
            if(seconds==0){
            //Removing the first task from the tasks array
            //Updating the current task
            //Update the tasks
            setSeconds(currentTask ? currentTask.seconds : 0)
            console.log("false thing");
            setIsResting(false)
            }else{
                //Case to reducing the resting seconds
                setSeconds(prev=>prev-1)
            }
           
        }
    }else{
        console.log("soemthing out of the tasks array");
        
    }
    },1000)
    return () => clearInterval(interval)
},[currentTask,seconds,isTimerPaused])
   
useEffect(()=>{
    setCurrentTask(tasks[0])
    },[])

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
        const totalSeconds = (value.minutes * 60) + Number(value.seconds)
        console.log("seconds ",value.seconds,"minutes",value.minutes,"Total Seconds",totalSeconds);
        
        const newTask: TaskEntry = {
            id: uuid(),
            label: value.label,
            seconds:totalSeconds,
        };
        setTasks((prevTasks) => prevTasks.concat(newTask));
    }

    function handleRestAmountChange(e: React.ChangeEvent<HTMLSelectElement>) {
       //Convert the Minutes to seconds
       const seconds = parseInt(e.target.value) * 60
       //Set New Rest by the User
       setRest(seconds)
    }

    function handleTimerRestart() {
        setIsTimerPaused(false)
        if(isResting){
            setSeconds(rest)
        }else{
            setSeconds(currentTask?.seconds??0)
        }
    }

    function handleTimerPause() {
       
        setIsTimerPaused(prev=>!prev)
    }

    function handleTimerNextTask() {
        setIsResting(false)
        setIsTimerPaused(false)
        const tempTasks = tasks.splice(1)
        setCurrentTask(tempTasks[0])
        setSeconds(tempTasks[0].seconds)
        setTasks(tempTasks)
    }

    const pomodoroMessage = (
        <p className="text-center max-w-96 text-xl">
            You currently don't have any task added, to start the pomodoro
            timer, add a task first
        </p>
    );

    const taskDisplayMessage = isResting
        ? "You are currently resting"
        : currentTask?.label;

    const [timerMinutes,timerSeconds] = secondsToMinutesAndSeconds(seconds)
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
                            currentTask={currentTask}
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
                                   {isTimerPaused ? "▶️ "  : "⏸️" }
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
