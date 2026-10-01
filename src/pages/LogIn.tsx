import { useEffect, useState } from "react"
import AuthForm from "../components/AuthForm/AuthForm"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"



export interface LogInData {
    password : string 
    email : string
    device_id:string

}

const LogIn = () => {
    const [data , setData ] = useState<LogInData>(
        {
            email :"",
            password :"",
            device_id:"web"
        }
    ) 
    console.log(data)
useEffect(() => {
    if (!data.email || !data.password) return

    const formData = new FormData()

    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("device_id", data.device_id)

    fetch("https://vica.website/api/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,
    })
        .then((res) => res.json())
.then((res) => {
    console.log("LOGIN RESPONSE:", res)

    if (res.status === "success") {

    localStorage.setItem(
        "token",
        res.data.token
    )

    localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data.user)
    )

    localStorage.setItem(
        "loginSuccess",
        "true"
    )

    navigate("/dashboard/items")
    } else {

        toast.error(res.message)

    }
})
        .catch((err) => {
            console.log(err)
            toast.error("Something went wrong!")
        })
}, [data])

    const inputs = [
    {
        label : "Email Address:" ,
        type : "email" ,
        placeholder : "example@gmail.com ",
        name :"email"
    },
    {
        label : "password:" ,
        type : "password" ,
        placeholder : "********",
        name :"password"
    }
]
const navigate = useNavigate()

    return (
        <>
        <AuthForm<LogInData>
        title="Login to Account"
        description="Please enter your email and password to continue"
        input={inputs}
        btn="Sing In"
        footer={{description : "Don’t have an account?" , link : {content : "Create Account" , url : "/signup"}}}
        setData={setData}
        />
        </>
    )
}

export default LogIn
