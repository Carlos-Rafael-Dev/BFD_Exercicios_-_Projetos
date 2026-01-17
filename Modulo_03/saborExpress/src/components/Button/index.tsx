import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
    variant?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ 
    children, 
    variant = 'primary',
    ...props
}: ButtonProps) {
    return (
        <button 
        {...props}
        className={`btn btn-${variant}`}
        >
            {children}
        </button>
    );
}