interface ControlButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const ControlButton = ({ children,onClick }: ControlButtonProps) => {
    return (
        <button onClick={onClick} className="border border-slate-700 rounded-full bg-slate-900 grid place-items-center w-16 h-16">
            {children}
        </button>
    );
};

export default ControlButton;
