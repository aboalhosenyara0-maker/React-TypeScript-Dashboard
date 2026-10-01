import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar"
import square from "../assets/square.png"
import icon from "../assets/icon.png"
import icon2 from "../assets/icons2.png"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const SearchContext = createContext<string>("")

const Root = () => {

    const [search, setsearch] = useState<string>("")
    const [mode, setMode] = useState<boolean>(false)

    useEffect(() => {

    const loginSuccess = localStorage.getItem("loginSuccess")
    const userInfo = localStorage.getItem("userInfo")
    const editSuccess = localStorage.getItem("editSuccess")

    if (loginSuccess === "true" && userInfo) {

        const user = JSON.parse(userInfo)

        toast.success("Account created successfully!")

        localStorage.removeItem("loginSuccess")

        setTimeout(() => {
            toast.success(`Hi, ${user.first_name}! 👋😊`)
        }, 6000)
    }

    if (editSuccess === "true") {

        toast.success("Product updated successfully! 🎉")

        localStorage.removeItem("editSuccess")
    }

}, [])


    const items = [
        {
            content: "Products",
            link: "/dashboard/items",
            icon: square,
            iconClass: "w-10 h-10 dark:"
        },
        {
            content: "Favorites",
            link: "/dashboard/favorites",
            icon: icon,
            iconClass: "w-10 h-10 "
        },
        {
            content: "Order Lists",
            link: "/dashboard/orders",
            icon: icon2,
            iconClass: "w-5 h-5"
        }
    ]


    return (
        <div className={`${mode && "dark"} flex dark:bg-gray-800`}>

            <SearchContext.Provider value={search}>

                <SideBar
                    logo="DashStack"
                    items={items}
                />

                <div className="grow">

                    <NavBar
                        setsearch={setsearch}
                        setMode={setMode}
                        mode={mode}
                    />

                    <div className="p-6">
                        <Outlet />
                    </div>

                </div>

            </SearchContext.Provider>

        </div>
    )
}

export default Root
