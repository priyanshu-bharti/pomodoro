interface RestInputProps {
    setRestAmount: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const RestInput = ({ setRestAmount }: RestInputProps) => {
    return (
        <div className="flex items-center gap-2">
            <label className="" htmlFor="rest">
                Rest
            </label>
            <select
                name="rest"
                className="bg-transparent border p-2 rounded-md border-gray-500"
                id="rest"
                defaultValue="5"
                onChange={setRestAmount}
            >
                <option value="5">5 Mins</option>
                <option value="7">7 Mins</option>
                <option value="10">10 Mins</option>
                <option value="15">15 Mins</option>
                <option value="20">20 Mins</option>
                <option value="25">25 Mins</option>
                <option value="30">30 Mins</option>
            </select>
        </div>
    );
};

export default RestInput;
