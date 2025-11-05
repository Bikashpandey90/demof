const NeuButton = ({ children }: { children: string }) => {
    return (
        <button
            className="
        px-10 py-2 
        text-2xl 
        font-bold 
        bg-[#FF8000] 
        text-white 
        w-fit 
        transition-all
        rounded-lg
        border-4
        border-[#FF8000]
        shadow-[5px_5px_0px_#C6211D,10px_10px_0px_#FF8000]
        hover:shadow-[4px_4px_0px_#D97706]
        hover:translate-x-1
        hover:translate-y-1
        uppercase
        tracking-wider
      "
        >
            {children}
        </button>
    )
}

export default NeuButton
