"use client"

export default function HotTastyConvenient() {
    return (
        <>
            <img
                src="/bg-header-top.png"
                alt="Top irregular edge"
                className="bg-[#C6211D] w-full h-auto block  -mt-[1px] z-100 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="relative w-full overflow-hidden">


                {/* Orange section */}
                <div className="bg-[#FF8000] py-16 relative z-0">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Text content */}
                            <div>
                                <h2 className="text-[48px] leading-10 font-bold font-brando text-white mb-8 drop-shadow-lg ">
                                    HOT, TASTY
                                    <br />
                                    AND CONVENIENT
                                </h2>
                                <p className="text-white font-bold text-2xl leading-8 font-gothic">
                                    Whether you're looking for a quick delicious lunch or a healthy snack to fill an after school or
                                    pre/post gym hunger gap, Mug Shot will fill you up with tasty goodness in less than 5 minutes.
                                </p>
                            </div>



                        </div>
                    </div>
                </div>
            </section>
            <img
                src="/bg-header-bottom.png"
                alt="Bottom irregular edge"
                className=" bg-[#C6211D] w-full h-auto block -mb-[1px] z-10 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
        </>
    )
}
