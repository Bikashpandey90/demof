const NeuButton = ({ children, color }: { children: string; color: string }) => {
    return (
        <button
            style={{
                boxShadow: `2px 2px 0px ${color}, 6px 6px 0px #FF8000`,
                borderColor: color,
            }}
            className={`
                px-8 py-2 
                text-2xl 
                font-bold 
                bg-[#FF8000] 
                text-white 
                w-fit 
                transition-all
                rounded-xl
                border-4
                hover:shadow-[4px_4px_0px_#D97706]
                hover:translate-x-1
                hover:translate-y-1
                uppercase
                tracking-wider
            `}
        >
            {children}
        </button>
    )
}

export default NeuButton
