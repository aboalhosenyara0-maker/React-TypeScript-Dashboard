import { useContext, useEffect, useState } from "react"
import { SearchContext } from "./Root"
import del from "../assets/delete.png"
import create from "../assets/blus.png"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

interface Prouduct {
    id: number
    name: string
    price: string
    image_url: string
    created_at: string
    updated_at: string
}

const Items = () => {
    const search = useContext(SearchContext)

    const [data, setData] = useState<Array<Prouduct>>([{
        id: 0,
        name: "",
        price: "",
        image_url: "",
        created_at: "",
        updated_at: ""
    }])

    const [showData, setshowData] = useState<Array<Prouduct>>()

    // هل الـ Popup ظاهر؟
    const [showPopup, setShowPopup] = useState(false)

    // رقم المنتج الذي اخترنا حذفه
    const [selectedId, setSelectedId] = useState<number | null>(null)


    useEffect(() => {
        setshowData(
            data.filter(value => {
                return value.name.includes(search)
            })
        )
    }, [search, data])


    useEffect(() => {
        axios.get("https://vica.website/api/items", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                Accept: "application/json"
            }
        })
        .then(res => {
            console.log(res)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    const deleteProduct = (id: number) => {
        const token = localStorage.getItem("token")

        console.log("DELETE ID:", id)
        console.log("TOKEN EXISTS:", !!token)

        axios.delete("https://vica.website/api/items/" + id, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
        .then(res => {
            console.log("DELETE RESPONSE:", res.data)
            toast.success("Product deleted successfully! 🗑️")

            setData(prev => prev.filter(item => item.id !== id))
        })
        .catch(err => {
            console.log("DELETE STATUS:", err.response?.status)
            console.log("DELETE ERROR:", err.response?.data)
            toast.error("Failed to delete product")
        })
    }


    return (
        <div>

            <div className="flex justify-between">
                <h1 className="text-4xl dark:text-amber-50">All Prouducts</h1>

                <div className="relative bg-blue-500 text-amber-50 w-[180px] h-[40px] rounded-md cursor-pointer p-2">
                    <img src={create} className=" absolute w-8 bottom-1 left-1" alt="" />
                    <Link
                        to="/dashboard/items/add"
                        className="ml-8"
                    >
                        Greate Prouduct
                    </Link>
                </div>
            </div>
            <div className="flex flex-wrap mt-8 gap-8">
                {showData?.map((Prouduct) => {
                    return (
                        <div
                            key={Prouduct.id}
                            className="w-[250px] h-[290px] rounded-2xl dark:bg-dark dark:text-white p-4 mb-4"
                        >
                            <img
                                className="max-w-[80%] h-[70%] p-4 mx-auto"
                                src={Prouduct.image_url}
                                alt=""
                            />

                            <h2>{Prouduct.name}</h2>

                            <p className="text-blue-500">
                                {Prouduct.price}
                            </p>

                            <div className="flex justify-between cursor-pointer">

                                <Link
                                    to={`/dashboard/items/edit/${Prouduct.id}`}
                                    className="cursor-pointer"
                                >
                                    Edit Prouduct
                                </Link>


                                <button
                                    onClick={() => {
                                        setSelectedId(Prouduct.id)
                                        setShowPopup(true)
                                    }}
                                    className="cursor-pointer"
                                >
                                    <img
                                        src={del}
                                        alt=""
                                        className="w-6 h-6 dark:brightness-0 dark:invert"
                                    />
                                </button>

                            </div>

                        </div>
                    )
                })}

            </div>


            {/* Delete Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">

                    <div className="bg-white dark:bg-dark rounded-2xl p-6 w-[350px] text-center shadow-xl">

                        <h2 className="text-xl font-bold dark:text-white mb-3">
                            Delete Product
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete this product?
                        </p>


                        <div className="flex justify-center gap-4">

                            {/* No */}
                            <button
                                onClick={() => {
                                    setShowPopup(false)
                                    setSelectedId(null)
                                }}
                                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
                            >
                                No
                            </button>


                            {/* Yes */}
                            <button
                                onClick={() => {

                                    if (selectedId !== null) {
                                        deleteProduct(selectedId)
                                    }

                                    setShowPopup(false)
                                    setSelectedId(null)
                                }}
                                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-500 cursor-pointer"
                            >
                                Yes
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default Items
