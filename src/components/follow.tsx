"use client"

// import { useState } from "react"
import NeuButton from "./button"

export default function FollowUs() {
    const posts = [
        { id: 1, image: "/posts/download.jpeg" },
        { id: 2, image: "/posts/download (1).jpeg" },
        { id: 3, image: "/posts/download (2).jpeg" },
        { id: 4, image: "/posts/download (3).jpeg" },
        { id: 5, image: "/posts/download (4).jpeg" },

    ]

    // const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <div className="bg-[#C6211D]">
            <img
                src="/blue.svg"
                alt="Top irregular edge"
                className="bg-transparent w-full h-auto block  z-100 pointer-events-none"

                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="bg-[#249F95] py-24 relative overflow-hidden">
                <div className="max-w-[85rem] mx-auto px-4">
                    <h2 className="text-[80px] leading-[96px] font-script text-white text-center mb-8 drop-shadow-lg font-turbinado">Follow us</h2>

                    <p className="text-white text-center text-2xl leading-8 font-gothic font-bold  mb-4">Take a moment and check out our social.</p>

                    <p className="text-white text-center  mb-12 font-gothic font-bold text-2xl leading-8 ">
                        If you're grabbing a quick lunch at work, or snacking on a delicious pot
                        <br />
                        on the go, share your experiences with us and join the community.
                    </p>

                    <div className="flex justify-center mb-16">
                        <NeuButton color={'#249F95'}>
                            CONNECT
                        </NeuButton>
                    </div>

                    {/* Social feed carousel */}
                    <div className=" pb-4">
                        <div className="flex gap-4 justify-center min-w-max px-4">
                            {posts.map((post) => (
                                <div key={post.id} className="relative flex-shrink-0">
                                    <img
                                        src={post.image || "/placeholder.svg"}
                                        alt="Social post"
                                        className="w-80 h-80 object-cover  shadow-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </section>

        </div>
    )
}
