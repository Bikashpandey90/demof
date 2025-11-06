"use client"

export default function HeroSection() {
    return (
        <section className="pt-24 pb-0 bg-stone-200 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-8">
                    YOU'RE BETTER OFF
                    <br />
                    <span className="inline-block">WITH A</span>
                </h1>

                <div className="relative inline-block my-12">
                    <div className="text-8xl md:text-9xl font-bold text-white drop-shadow-lg">
                        mug
                        <br />
                        <span className="inline-block relative">
                            shot<sup className="text-5xl">®</sup>
                        </span>
                    </div>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80">
                    <img
                        src="/red-noodle-bowl-with-chili-peppers.jpg"
                        alt="Mug Shot noodle bowl"
                        className="w-full h-full object-cover drop-shadow-2xl"
                    />
                </div>
            </div>

        </section>
    )
}
