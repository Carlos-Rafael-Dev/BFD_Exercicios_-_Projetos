type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
};

export default function Button({ 
    children, 
    onClick,
    variant = 'primary', 
}: ButtonProps) {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {children}
        </button>
    );
}