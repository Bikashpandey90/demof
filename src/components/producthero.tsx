import NeuButton from "./button";

export default function ProductHero() {
    return (
        <main className="min-h-screen bg-[#416BA9] flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12   justify-items-center mt-16 sm:mt-0 lg:px-2 py-2 lg:py-0 items-center max-w-7xl mx-auto ">
                <div className="flex justify-center lg:justify-start mt-2 px-6 order-1  lg:order-1">
                    <div className="relative w-full max-w-[500px]">
                        <img
                            // src='/darjeeling.png'
                            src="/bluepro.png"
                            alt="Mug Shot Salt & Pepper Chilli Beef Noodles"
                            width={400}
                            height={600}
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-6 order-2   justify-center items-center px-6  py-0 lg:py-20 mt-2 lg:mt-40 lg:order-2">

                    <div>
                        <p className="lg:mt-3 mt-0 text-white text-[20px] leading-[24px] lg:text-[27px]  lg:leading-[30px] text-center  uppercase font-gothic  font-semibold mb-2">
                            Mug Shot Sachets
                        </p>
                        <h1 className="text-[32px] leading-9 drop-shadow-lg lg:text-[50px] lg:mt-4 max-w-[320px]  sm:max-w-full  mt-2 text-center  lg:leading-[60px] font-bold font-brando  text-[#172538]  text-balance">
                            Salt & Pepper Chilli Beef Flavour Noodles
                        </h1>
                    </div>

                    <p className="text-sm leading-[15px] lg:text-xl lg:leading-[22px] mb-6 text-white max-w-[300px] lg:max-w-xl mt lg:mt-4 font-gothic text-center">
                        Dried ribbon noodles in a spicy, salt and pepper beef flavour sauce with red and green pepper.
                    </p>


                    <NeuButton shadow="#172538" className="bg-[#172538]  text-[#416BA9]" color="#416BA9">
                        Buy It Now
                    </NeuButton>

                    <div className="flex items-center  justify-center lg:justify-between w-[350px] py-5 lg:py-0 lg:w-[500px] h-24 mt-4 lg:mt-10 px-0 lg:px-5 overflow">
                        <img src="/product/natural.svg" className="h-full" />
                        <div className="w-[.5px] h-full bg-white mx-4"></div>
                        <img src="/product/no-artificial.svg" className="h-full" />
                    </div>

                </div>
            </div>
        </main>
    );
}
