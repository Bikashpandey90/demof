const NeuButton = ({ text }: { text: string }) => {
    return (
        <button className="px-6 py-2 font-quicksand text-2xl border-2 border-[#D63D29] bg-white text-[#D63D29] rounded-3xl w-fit transition-all shadow-[4px_4px_0px_#D63D29] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            {text}
        </button>
    );
};

export default NeuButton;