"use client"

import { useState } from "react"

export default function FollowUs() {
    const posts = [
        { id: 1, image: "/boil-bubble-toil-noodles-cauldron.jpg" },
        { id: 2, image: "/who-is-the-traitor-mug-shot-bottles.jpg" },
        { id: 3, image: "/win-prize-mug-shot-hamper.jpg" },
        { id: 4, image: "/person-holding-mug-shot-product.jpg" },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <section className="bg-teal-500 py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-5xl md:text-6xl font-script text-white text-center mb-8 drop-shadow-lg">Follow us</h2>

                <p className="text-white text-center text-lg mb-4">Take a moment and check out our social.</p>

                <p className="text-white text-center text-lg mb-12">
                    If you're grabbing a quick lunch at work, or snacking on a delicious pot
                    <br />
                    on the go, share your experiences with us and join the community.
                </p>

                <div className="flex justify-center mb-16">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-teal-500 font-bold py-3 px-8 rounded-2xl text-lg border-4 border-yellow-600 transition-colors">
                        CONNECT
                    </button>
                </div>

                {/* Social feed carousel */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 justify-center min-w-max px-4">
                        {posts.map((post) => (
                            <div key={post.id} className="relative flex-shrink-0">
                                <img
                                    src={post.image || "/placeholder.svg"}
                                    alt="Social post"
                                    className="w-64 h-64 object-cover rounded-lg shadow-lg"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg">
                                    <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button className="text-white text-3xl hover:opacity-80 transition-opacity">❮</button>
                    <button className="text-white text-3xl hover:opacity-80 transition-opacity">❯</button>
                </div>
            </div>
        </section>
    )
}
