"use client"

interface WaveTransitionProps {
    fromColor: string
    toColor: string
    isReverse?: boolean
}

export default function WaveTransition({ fromColor, toColor, isReverse }: WaveTransitionProps) {
    return (
        <div className="relative h-24 overflow-hidden">
            <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                    d={
                        isReverse
                            ? "M0,64 Q300,0 600,64 T1200,64 L1200,0 L0,0 Z"
                            : "M0,64 Q300,120 600,64 T1200,64 L1200,120 L0,120 Z"
                    }
                    fill={toColor === "bg-white" ? "white" : toColor === "bg-mug-red" ? "#E63946" : "#14B8A6"}
                />
            </svg>
        </div>
    )
}
