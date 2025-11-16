export default function IngredientsPage() {
    return (
        <>
            <div className="relative bg-[#416BA9]  ">
                <img src="/product/ingridientTop.svg" />
            </div>


            <div className=" bg-[#172538]  flex justify-center items-center  w-full mx-auto pb-24 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 mx-8 lg:mx-0 max-w-7xl gap-12 lg:gap-20">
                    <div>
                        <h2 className="text-3xl lg:text-[40px] leading-[36px] lg:leading-[48px] font-brando font-bold text-[#416BA9] mb-3 uppercase ">Ingredients</h2>

                        <div className="space-y-6 text-white">
                            <p className=" text-lg lg:mt-0 lg:text-2xl leading-[22px] lg:leading-[26px]  mt-6 font-gothic  ">
                                <span className="font-extrabold">INGREDIENTS</span> Dried Noodles [Durum{" "}
                                <span className="font-bold">WHEAT</span> Semolina, <span className="font-bold">EGG</span> White, Salt],
                                Maltodextrin, Potato Starch, Natural Flavourings (contain <span className="font-bold">WHEAT</span>),
                                Garlic Powder, Onion Powder, Sugar, Ground Paprika, Dried Red Pepper, Dried Green Pepper, Salt, Ground
                                Black Pepper, Ground Ginger, <span className="font-bold">BARLEY</span> Malt Extract, Chinese Five Spice
                                [Salt, Star Anise, Sugar, Onion Powder, Garlic Powder, Black Pepper, Cinnamon, Clove, Fennel Seed,
                                Ginger], Dried Jalapeno Pepper, Ground Cayenne.
                            </p>

                            <div className="space-y-1 text-lg leading-[22px] pt-2 font-gothic lg:text-2xl lg:leading-[26px]">
                                <p className="font-bold ">ALLERGY ADVICE:</p>
                                <p className="">
                                    For allergens, including cereals containing gluten, see ingredients in{" "}
                                    <span className="font-bold">BOLD</span>
                                </p>
                                <p className="">
                                    Also, may contain milk, soya, mustard and other gluten sources.
                                </p>
                            </div>

                            <p className="font-bold font-gothic text-lg leading-[22px]  lg:text-2xl lg:leading-[26px] ">Suitable for Vegetarians</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl leading-[36px] lg:text-[40px] lg:leading-[48px] font-brando  text-[#416BA9] font-bold  mb-3 uppercase ">
                            Nutritional Information
                        </h2>

                        <div className="space-y-6  text-white">
                            <p className="text-lg  leading-5 font-gothic">
                                Once boiling water has been added to this pot it weighs 268g (approx.). This represents one serving. All
                                values below relate to the product when made up with water (i.e. per 100g is a portion of the 268g
                                serving).
                            </p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 pb font-gothic ">
                                    <div>
                                        <p className="font-bold text-[22px] leading-[22px] mb-2">
                                            TYPICAL VALUES
                                            {/* <br />
                                            (AS CONSUMED) */}
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold  text-[22px] leading-[22px]">PER 100g</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-[22px] leading-[22px]">PER SACHET</p>
                                    </div>
                                </div>

                                {[
                                    { label: "Energy", per100g: "364kJ/86kcal", perSachet: "947kJ/224kcal" },
                                    { label: "Fat", per100g: "0.3g", perSachet: "0.8g" },
                                    { label: " Saturates", per100g: "0.1g", perSachet: "0.3g" },
                                    { label: "Carbohydrate", per100g: "17.6g", perSachet: "45.6g" },
                                    { label: " Sugars", per100g: "0.9g", perSachet: "2.4g" },
                                    { label: "Fibre", per100g: "1.3g", perSachet: "3.4g" },
                                    { label: "Protein", per100g: "2.6g", perSachet: "6.8g" },
                                    { label: "Salt", per100g: "0.93g", perSachet: "2.41g" },
                                ].map((row, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-4 sm:gap-1 lg:gap-1">
                                        <p className=" text-[18px] leading-[10px] lg:text-[22px]  font-gothic text-left lg:leading-[8px] ">{row.label}</p>
                                        <p className="text-[18px] leading-[10px] lg:text-[22px]  font-gothic text-left lg:leading-[8px]">{row.per100g}</p>
                                        <p className="text-[18px] leading-[10px] lg:text-[22px]  font-gothic text-left lg:leading-[8px]">{row.perSachet}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[16px] lg:text-[18px] leading-[20px] font-gothic pt-4">*Reference Intake of an average adult (8400kJ / 2000kcal)</p>
                        </div>
                    </div>
                </div>


            </div>

            <div className="relative bg-[#416BA9] ">
                <img src="/product/ingridientbottom.svg" />
                <img
                    src="/product/ready.svg"
                    alt="ready product"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] h-[150px] z-10"
                />
                {/* <img src="/product/ready.svg" className="z-10  flex justify-self-center items-center h-[200px]" /> */}
            </div>

        </>
    )
}
