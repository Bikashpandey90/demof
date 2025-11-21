import React from 'react';

interface NeuButtonProps {
    children?: React.ReactNode;
    color: string;
    className?: string;
    shadow?: string;
    style?: React.CSSProperties;
}

const NeuButton = ({ children, color, className = 'bg-[#FF8000]  text-white', shadow = '#FF8000', style }: NeuButtonProps) => {
    return (
        <button
            style={{
                ...style,
                boxShadow: `2px 2px 0px ${color}, 6px 6px 0px ${shadow}`,
                borderColor: color,
            }}
            className={`${className}
                px-8 py-2 
                font-bold 
                font-bourton
                text-3xl
                leading-8
                w-fit 
                transition-all
                rounded-xl
                border-4
                hover:shadwow-[4px_4px_0px_#D97706]
                hover:translate-x-1
                hover:translate-y-1
                uppercase
               
            `}
        >
            {children}
        </button>
    )
}

export default NeuButton
