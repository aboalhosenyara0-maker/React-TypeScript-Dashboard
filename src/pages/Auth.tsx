import { Outlet } from "react-router-dom"
import bg from '../assets/image.png'

const Auth = () => {
    return (
        <div className="relative flex justify-center items-center h-screen ">
            <img src={bg} alt="" className="absolute top-[0] left-[0] z-[-2] h-screen w-screen bg-blue" />
            <Outlet/>
        </div>
    )
}

export default Auth
