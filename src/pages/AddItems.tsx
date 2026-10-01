import { useEffect, useState } from "react"
import ItemForm, { type product } from "../components/ItemForm/ItemForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const AddItems = () => {

    const [data , setData] = useState<product>({
    name : "",
    price: "",
    image:null
    })
    const navigate = useNavigate()
    useEffect(() => {

    if (data.image != null && data.name != "" && data.price != "") {

        axios.post(
            "https://vica.website/api/items",
            data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(res => {

            console.log( res.data)

            toast.success("Product added successfully!")

            setTimeout(() => {
                navigate("/dashboard/items")
            }, 1000)

        })
        .catch(err => {

            console.log(err)

            toast.error("Something went wrong!")

        })
    }

}, [data])
    return (
        <div>
            <h1 className="text-4xl dark:text-amber-50">Create product</h1>
        <ItemForm
        setData={setData}
        />
        </div>
    )
}

export default AddItems
