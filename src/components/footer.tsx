"use client"

export default function Footer() {
    return (
        <footer className="bg-[#FF8000] text-white  relative overflow ">


            <div className="bg-[url('/paper-bg.png')] bg-cover  bg-center  "
            >
                <img src="/betteroff.png" className="h-[80%] w-[80%] p-32 self-center justify-self-center " />

            </div>

            <div className="max-w-7xl mx-auto px-4 mt-20">

                {/* Top section - Links and social */}
                <div className="grid md:grid-cols-3 gap-8 ">
                    <div className="md:col-span-2">
                        <nav className="flex flex-wrap gap-6 text-sm md:text-base font-semibold">
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Terms & Conditions
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Privacy
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Cookie policy
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Prize Draw
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Contact
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Modern Slavery Statement
                            </a>
                        </nav>
                    </div>

                    <div className="text-right">
                        <p className="font-bold mb-4">Connect with us</p>
                        <div className="flex justify-end gap-4">
                            <a
                                href="#"
                                className="w-12 h-12 bg-mug-red rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                📷
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 bg-mug-red rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                f
                            </a>
                        </div>
                    </div>
                </div>

                {/* Company info */}
                <div className="mb-8">
                    <p className="font-bold mb-4">Symington's Ltd</p>
                    <p className="text-sm mb-2">(part of Princes Limited)</p>
                    <p className="text-sm mb-2">Thornes Farm Business Park,</p>
                    <p className="text-sm mb-2">Pontefract Lane,</p>
                    <p className="text-sm mb-2">Leeds,</p>
                    <p className="text-sm mb-4">LS9 0DN</p>

                    <p className="text-sm">
                        Princes Limited, Royal Liver Building, Pier Head, Liverpool, L3 1NX, UK. Registered company number 02328824
                    </p>
                </div>

                {/* Cookie preferences */}
                <button className="text-sm hover:opacity-80 mb-8 transition-opacity">Update cookies preferences</button>
            </div>

        </footer >
    )
}
