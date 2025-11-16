const NeuButton = ({ children, color, className, shadow }: { children: string; color: string, className?: string | 'bg-[#FF8000]  text-white', shadow?: string | '#FF8000' }) => {
    return (
        <button
            style={{
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
                hover:shadow-[4px_4px_0px_#D97706]
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
