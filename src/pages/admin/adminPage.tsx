"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { Icon } from "@iconify/react"
import ThemeToggleButton from "../../helper/ThemeToggleButton"
import { NavLink, Outlet, useNavigate } from "react-router-dom"

const MasterLayout = () => {
    const [sidebarActive, setSidebarActive] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const pathname = usePathname()
    const navigate = useNavigate()

    useEffect(() => {
        setMobileMenu(false)
    }, [pathname])

    const isActive = (href: string) => pathname === href

    const NavItem = ({ href, label, icon }: { href: string; label: string; icon: string }) => (
        <li className="list-none">
            <NavLink
                to={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors 
                    ${isActive(href)
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                    ${sidebarActive && "justify-center"}  // CENTER ICON WHEN COLLAPSED
                `}
            >
                <Icon icon={icon} className="text-xl sm:text-xl" />
                {!sidebarActive && <span>{label}</span>}
            </NavLink>
        </li>
    )


    return (
        <div className={`min-h-screen bg-background ${mobileMenu ? "overflow-hidden" : ""}`}>
            {mobileMenu && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenu(false)} />}

            <aside
                className={`   fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 overflow-y-auto 
                    ${mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }
                    ${sidebarActive ? "w-20" : 'w-64'} // WIDTH CLASS
                    `}
            >
                <button
                    onClick={() => setMobileMenu(false)}
                    className="lg:hidden absolute right-4 top-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                    <Icon icon="radix-icons:cross-2" className="text-xl" />
                </button>

                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between"> {/* CENTER CONTENT */}
                    <NavLink to="/" className="flex items-center gap-2">
                        <img src="/mugshotlogo.png" alt="logo" width={40} height={40} className="w-[40px] h-[40px]" />
                        {!sidebarActive && <span className="font-bold text-lg">Dashboard</span>}
                    </NavLink>
                </div>

                <nav className="p-4 space-y-2">
                    <div>
                        <button
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors 
                                ${sidebarActive && "justify-center"}`}
                            onClick={() => {
                                navigate('')
                            }}
                        >
                            <Icon icon="solar:home-smile-angle-outline" className="text-xl" />
                            {!sidebarActive && <span>Dashboard</span>}
                        </button>
                    </div>

                    <hr className="my-4 border-gray-200 dark:border-gray-800" />


                    {!sidebarActive && (
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-4 py-2">
                            Create Item
                        </h3>
                    )}

                    <NavItem href="product" label="Product" icon="mage:email" />
                    <NavItem href="category" label="Category" icon="bi:chat-dots" />


                    <hr className="my-4 border-gray-200 dark:border-gray-800" />


                    {!sidebarActive && (
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-4 py-2">
                            Items Lists
                        </h3>
                    )}
                    <NavItem href="products" label="Products" icon="fe:vector" />
                    <NavItem href="categories" label="Categories" icon="icon-park-outline:setting-two" />
                </nav>
            </aside>

            <div className={`${sidebarActive ? "lg:ml-20" : "lg:ml-64"} transition-all duration-300`}>
                <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarActive(prev => !prev)}
                                    className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <Icon icon={sidebarActive ? "iconoir:arrow-right" : "heroicons:bars-3-solid"} className="text-2xl" />
                                </button>
                                <button
                                    onClick={() => setMobileMenu(!mobileMenu)}
                                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <Icon icon="heroicons:bars-3-solid" className="text-2xl" />
                                </button>

                                <div className="hidden sm:block flex-1 max-w-x">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <Icon
                                            icon="ion:search-outline"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <ThemeToggleButton />

                                <div className="relative group hidden sm:block">
                                    <button className=" hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        <img
                                            src="/usa.png"
                                            alt="language"
                                            width={36}
                                            height={36}
                                            className="rounded-full p-[7px] bg-[#EBECEC]"
                                        />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-4 hidden group-hover:block">
                                        <h6 className="font-semibold text-sm mb-4">Choose Language</h6>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {["English", "Japan", "France", "Germany", "Korea", "Bangladesh", "India", "Canada"].map(
                                                (lang, idx) => (
                                                    <label
                                                        key={lang}
                                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer"
                                                    >
                                                        <img
                                                            src={`/generic-flag.png?height=36&width=36&query=flag-${idx}`}
                                                            alt={lang}
                                                            width={36}
                                                            height={36}
                                                            className="rounded-full"
                                                        />
                                                        <span className="text-sm font-medium">{lang}</span>
                                                        <input type="radio" name="language" className="ml-auto" />
                                                    </label>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 bg-[#EBECEF] transition-colors relative">
                                        <Icon icon="mage:email" className="text-2xl" />
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                    </button>
                                </div>

                                <div className="relative group">
                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 bg-[#EBECEF] transition-colors relative">
                                        <Icon icon="iconoir:bell" className="text-2xl" />
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                    </button>
                                </div>

                                <div className="relative group">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                        <img
                                            src="/user.png"
                                            alt="profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="min-h-[calc(100vh-100px)] bg-[#F5F6FA] p-4 lg:p-6">
                    <Outlet />
                </main>

                <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 lg:px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 WowDash. All Rights Reserved.</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Made by <span className="text-primary font-semibold">Bikash Pandey</span>
                        </p>
                    </div>
                </footer>
            </div>
        </div >
    )
}

export default MasterLayout