"use client"

export default function OurRange() {
    const products = [
        { id: 1, name: "Chicken", image: "/blue.png" },
        { id: 2, name: "Beef", image: "/pink.png" },
        { id: 3, name: "Prawn", image: "/yellow.png" },
        { id: 4, name: "BBQ", image: "/yellow2.png" },
        { id: 5, name: "Spicy", image: "" },
        { id: 6, name: "Tomato", image: "bg-red-400" },
        { id: 7, name: "Herbs", image: "bg-green-400" },
    ]

    return (
        <section className="bg-[#C6211D] py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-8 drop-shadow-lg font-script">
                    Our range
                </h2>

                <p className="text-white text-center text-lg mb-8">
                    When you're on the go, take time out for a few delicious minutes with Mug Shot, the
                    <br />
                    warm, comforting, convenient flavour-packed snack.
                </p>

                <p className="text-white text-center text-lg mb-16">For the perfect pick me up. Wherever you're heading.</p>

                {/* Products carousel */}
                <div className="overflow-x-auto pb-8 mb-12">
                    <div className="flex gap-6 justify-center min-w-max px-4">
                        {products.map((product) => (
                            <div key={product.id} className="flex flex-col items-center">
                                <div className={`w-40 h-48 rounded-lg flex items-center justify-center shadow-lg `}>
                                    <img src={product.image} alt={product.name} className="h-40 w-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">SACHETS</h3>
                    </div>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-mug-red font-bold py-3 px-8 rounded-2xl text-lg border-4 border-yellow-600 transition-colors">
                        POTS
                    </button>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">MIGHTY POTS</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
