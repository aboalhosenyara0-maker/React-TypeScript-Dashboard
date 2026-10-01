import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

interface Items {
    link: string;
    content: string;
    icon: string;
    iconClass: string;
}

interface Props {
    logo: string;
    items: Array<Items>;
}

const SideBar = ({ logo, items }: Props) => {
    const navigate = useNavigate();

    const [showLogout, setShowLogout] = useState(false);

    const logOut = () => {
        fetch("https://vica.website/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);

                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");
                toast.success("You have been logged out successfully! 👋");

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="w-[220px] py-6 text-center flex flex-col gap-8 h-screen dark:bg-dark">

                <h1 className="dark:text-white">
                    {logo}
                </h1>

                <div className="flex flex-col justify-between grow items-center">

                    <ul className="grow flex flex-col gap-6">
                        {items.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className="dark:text-white flex gap-4 justify-center items-center"
                                >
                                    <img
                                        src={item.icon}
                                        alt=""
                                        className={`${item.iconClass} dark:brightness-0 dark:invert`}
                                    />

                                    <Link to={item.link}>
                                        {item.content}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        onClick={() => setShowLogout(true)}
                        className="dark:text-white w-[180px] cursor-pointer h-12 rounded-2xl bg-blue-500 text-amber-50"
                    >
                        Log out
                    </button>

                </div>
            </div>
            {/* Logout Popup */}
            {showLogout && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">

                    <div className="w-[350px] rounded-2xl bg-white p-6 shadow-xl dark:bg-dark">

                        <h2 className="text-xl font-semibold dark:text-white">
                            Log out
                        </h2>

                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Are you sure you want to log out?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                onClick={() => setShowLogout(false)}
                                className="rounded-lg border border-gray-300 px-5 py-2 dark:text-white cursor-pointer"
                            >
                                No
                            </button>

                            <button
                                onClick={logOut}
                                className="rounded-lg bg-blue-500 px-5 py-2 text-white cursor-pointer"
                            >
                                Yes
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default SideBar;
