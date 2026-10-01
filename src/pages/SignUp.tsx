import AuthForm from "../components/AuthForm/AuthForm"
import { useNavigate } from "react-router-dom"
import profileImage from "../assets/profile_image.png"
import { toast } from "react-toastify"

interface SignUpData {
    first_name: string
    last_name: string
    user_name: string
    password: string
    email: string
    password_confirmation: string
    profile_image: Blob | null
}

const SignUp = () => {

    const navigate = useNavigate()

    const inputs = [
        {
            label: "First Name:",
            type: "text",
            placeholder: "First Name",
            name: "first_name"
        },
        {
            label: "Last Name:",
            type: "text",
            placeholder: "Last Name",
            name: "last_name"
        },
        {
            label: "User Name:",
            type: "text",
            placeholder: "User Name",
            name: "user_name"
        },
        {
            label: "Email Address:",
            type: "email",
            placeholder: "example@gmail.com",
            name: "email"
        },
        {
            label: "Password:",
            type: "password",
            placeholder: "********",
            name: "password"
        },
        {
            label: "Confirmation password:",
            type: "password",
            placeholder: "********",
            name: "password_confirmation"
        },
        {
            label: profileImage,
            type: "file",
            name: "profile_image"
        }
    ]

    const handleSignUp = (data: SignUpData) => {

        const formData = new FormData()

        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("user_name", data.user_name)
        formData.append("password", data.password)
        formData.append("email", data.email)

        formData.append(
            "password_confirmation",
            data.password_confirmation
        )

        if (data.profile_image) {
            formData.append(
                "profile_image",
                data.profile_image
            )
        }

        fetch("https://vica.website/api/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        })
            .then(res => res.json())
            .then(res => {

                console.log("REGISTER RESPONSE:", res)

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

                    toast.error(
                        res.message || "Registration failed"
                    )
                }
            })
            .catch(err => {

                console.log(err)

                toast.error(
                    "Something went wrong!"
                )
            })
    }

    return (
        <AuthForm<SignUpData>
            formType="register"
            title="Create an Account"
            description="Create a account to continue"
            input={inputs}
            btn="Sign Up"
            footer={{
                description: "Already have an account?",
                link: {
                    content: "Login",
                    url: "/"
                }
            }}
            setData={() => {}}
            onSubmit={handleSignUp}
        />
    )
}

export default SignUp