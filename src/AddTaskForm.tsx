import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "./Tasks";

interface AddTaskFormProps {
    register: UseFormRegister<FormValues>;
    onSubmit: () => void;
    errors: FieldErrors<FormValues>;
}

const AddTaskForm = ({ register, onSubmit }: AddTaskFormProps) => {
    return (
        <form
            className="bg-gray-800 p-4 flex gap-4 rounded-xl border border-gray-700 items-end"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col flex-1">
                <label className="text-sm font-bold" htmlFor="label">
                    Task label
                </label>
                <input
                    type="text"
                    id="label"
                    className="bg-transparent border p-2 rounded-md border-gray-500"
                    {...register("label", {
                        required: {
                            value: true,
                            message: "Task label is required",
                        },
                    })}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-bold" htmlFor="minutes">
                    Mins
                </label>
                <input
                    type="number"
                    id="minutes"
                    defaultValue={25}
                    min={0}
                    max={59}
                    className="bg-transparent border p-2 rounded-md border-gray-500"
                    {...register("minutes")}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-bold" htmlFor="seconds">
                    Secs
                </label>
                <input
                    type="number"
                    id="seconds"
                    defaultValue={0}
                    min={0}
                    max={59}
                    className="bg-transparent border p-2 rounded-md border-gray-500"
                    {...register("seconds")}
                />
            </div>
            <button
                disabled={false}
                className="px-4 py-2 bg-purple-600 h-fit border border-purple-300 rounded-md disabled:opacity-25"
            >
                Add
            </button>
        </form>
    );
};

export default AddTaskForm;
