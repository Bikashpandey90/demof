"use client"

import NeuButton from "./button"

export default function GetInTouch() {
    return (
        < >
            <img
                src="/red-top.svg"
                alt="Top irregular edge"
                className="bg-[#249F95] w-full h-auto block  -mt-[1px] z-100 pointer-events-none"

                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="relative w-full overflow-hidden">


                {/* Orange section */}
                <div className="bg-[#C6211D] py-8 relative z-0">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <h2 className="text-[80px] leading-[96px] font-script text-white font-turbinado mb-12 drop-shadow-lg">Get in touch</h2>

                            <p className="text-white text-2xl leading-8 mb-12 font-bold font-gothic">
                                We're always happy to hear from our customers, whether it be to give
                                <br />
                                feedback on our products, provide suggestions on how you think we could
                                <br />
                                do better, or simply just make enquiries about the business.
                            </p>

                            <NeuButton color='#C6211D'>
                                CONTACT US
                            </NeuButton>
                        </div>
                    </div>
                </div>
            </section>
            <img
                src="/red.svg"
                alt="Bottom irregular edge"
                className=" bg-transparent w-full h-auto block -mb-[1px] z-30 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />


        </>
    )
}
