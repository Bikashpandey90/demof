"use client"

import NeuButton from "./button"

export default function GetInTouch() {
    return (
        < >
            <img
                src="/red-top.svg"
                alt="Top irregular edge"
                className="bg-[#14B8A6] w-full h-auto block  -mt-[1px] z-100 pointer-events-none"

                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="relative w-full overflow-hidden">


                {/* Orange section */}
                <div className="bg-[#C6211D] py-8 relative z-0">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <h2 className="text-6xl md:text-7xl font-script text-white mb-12 drop-shadow-lg">Get in touch</h2>

                            <p className="text-white text-lg md:text-xl leading-relaxed mb-12">
                                We're always happy to hear from our customers, whether it be to give
                                <br />
                                feedback on our products, provide suggestions on how you think we could
                                <br />
                                do better, or simply just make enquiries about the business.
                            </p>

                            <NeuButton>
                                CONTACT US
                            </NeuButton>
                        </div>
                    </div>
                </div>
            </section>
            <img
                src="/red.svg"
                alt="Bottom irregular edge"
                className=" bg-none w-full h-auto block -mb-[1px] z-10 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
        </>
    )
}
