import type React from "react"
import sun from '../../assets/sun.png'
import moon from '../../assets/moon.png'
import search from "../../assets/search.png"
import { useState } from "react"

interface props {
    setsearch :  React.Dispatch<React.SetStateAction<string>>
    setMode :  React.Dispatch<React.SetStateAction<boolean>>
    mode: boolean
}

const NavBar = ({setsearch , setMode ,mode} : props) => {

    const user = localStorage.getItem("userInfo")

    const [userInfo] = useState(
        user && user !== "undefined"
            ? JSON.parse(user)
            : {}
    )
    return (
        <nav className="flex justify-between p-6 dark:bg-dark">
            <div className="relative flex justify-center items-center">
                <img src={search} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 "/>
                <input className="w-full h-[35px] border border-gray-400 rounded-2xl pl-10 pr-4 bg-gray-200 outline-none" type="text" placeholder="Search a Prouduct ..." onChange={(event) => setsearch(event.target.value) } />
            </div>
            <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-3">
            <img
                src={userInfo.profile_image_url }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
            />

            <div className="dark:text-white">
                <p>
                    {userInfo.first_name} {userInfo.last_name}
                </p>

                <p>{userInfo.user_name}</p>
            </div>
        </div>
            <button onClick={() => setMode(prev => !prev) }><img src={mode ? moon : sun} alt="" className="w-[50px] h-[50px] cursor-pointer dark:brightness-0 dark:invert"/></button>
        </div>
        </nav>
    )
}

export default NavBar
