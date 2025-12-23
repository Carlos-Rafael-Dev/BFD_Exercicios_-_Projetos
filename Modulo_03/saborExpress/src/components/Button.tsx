type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} style={{ padding: '12px 20px' }}>
            {children}
        </button>
    );
}