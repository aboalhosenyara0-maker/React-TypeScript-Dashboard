import { useEffect, useState } from "react"
import ItemForm, { type OldData, type product } from "../components/ItemForm/ItemForm"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const EditItems = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState<product>({
        name: "",
        price: "",
        image: null
    })

    const [oldData, setOldData] = useState<OldData>({
        id: 0,
        name: "",
        price: "",
        image_url: ""
    })

    const [edit, setEdit] = useState<boolean>(false)


    useEffect(() => {

        axios.get(
            "https://vica.website/api/items/" + params.id,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json"
                }
            }
        )
        .then(res => {

            console.log("EDIT RESPONSE:", res.data)

            setOldData(res.data)

        })
        .catch(err => {

            console.log("EDIT ERROR:", err.response?.data)
            console.log("EDIT STATUS:", err.response?.status)

        })

    }, [params.id])


    useEffect(() => {

        if (edit) {

            const formData = new FormData()

            formData.append("name", data.name)
            formData.append("price", data.price)
            formData.append("_method", "PUT")

            if (data.image) {
                formData.append("image", data.image)
            }

            axios.post(
                "https://vica.website/api/items/" + params.id,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        Accept: "application/json"
                    }
                }
            )
            .then(res => {

                console.log("UPDATE RESPONSE:", res.data)

                toast.success("Product updated successfully!")

                setTimeout(() => {
                    navigate("/dashboard/items")
                }, 500)

            })
            .catch(err => {

                console.log("EDIT ERROR:", err.response?.data)
                console.log("EDIT STATUS:", err.response?.status)

                toast.error(
                    err.response?.data?.message || "Failed to update product"
                )

            })
        }

    }, [data, edit])


    return (
        <div>

            <h1 className="text-4xl dark:text-amber-50">
                Edit Product
            </h1>

            <ItemForm
                setData={(newData) => {
                    setData(newData)
                    setEdit(true)
                }}
                oldData={oldData}
            />

        </div>
    )
}

export default EditItems
