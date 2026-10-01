import { Link } from "react-router-dom"
import { useState } from "react"

import type {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction
} from "react"

export interface Props<T> {
    title: string
    description: string
    input: Array<{
        label: string
        placeholder?: string
        type: string
        name: string
    }>
    btn: string
    footer: {
        description: string
        link: {
            url: string
            content: string
        }
    }
    setData: Dispatch<SetStateAction<T>>
    formType?: "login" | "register"
    onSubmit?: (data: T) => void
}

const AuthForm = <T extends object>({
    title,
    description,
    input,
    btn,
    footer,
    setData,
    formType = "login",
    onSubmit
}: Props<T>) => {

    const [data, setFormData] = useState<T>({} as T)

    const dataHandiling = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value, files, type } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: type === "file"
                ? files?.[0]
                : value
        }))
    }

    const sendData = (event: FormEvent) => {
        event.preventDefault()

        if (onSubmit) {
            onSubmit(data)
        } else {
            setData(data)
        }
    }

    return (
        <form
            className={`
                rounded-3xl
                bg-white
                p-[24px]
                text-center
                flex
                flex-col
                ${
                    formType === "register"
                        ? "w-[780px] min-h-[650px]"
                        : "w-[500px] h-[546px]"
                }
            `}
            onSubmit={sendData}
        >

            <h1 className="text-xl font-extrabold">
                {title}
            </h1>

            <p className="mb-[32px]">
                {description}
            </p>

            <div className="flex flex-col flex-1 justify-between">

                <div
                    className={
                        formType === "register"
                            ? "grid grid-cols-6 gap-x-4"
                            : ""
                    }
                >

                    {input.map((input, index) => {

                        const fullWidth =
                            input.name === "email" ||
                            input.name === "profile_image"

                        return (
                            <div
                                key={index}
                                className={
                                    formType === "register"
                                        ? fullWidth
                                            ? "col-span-6"
                                            : "col-span-2"
                                        : ""
                                }
                            >

                                {input.type === "file" ? (
                                    <>
                                        <label
                                            htmlFor={`input${index}`}
                                            className="
                                                block
                                                text-start
                                                mb-[6px]
                                                cursor-pointer
                                            "
                                        >
                                            Profile Image:
                                        </label>

                                        <input
                                            id={`input${index}`}
                                            name={input.name}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={dataHandiling}
                                        />

                                        <label
                                            htmlFor={`input${index}`}
                                            className="
                                                w-[90px]
                                                h-[90px]
                                                rounded-2xl
                                                border
                                                border-gray-400
                                                bg-gray-300
                                                cursor-pointer
                                                flex
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                hover:-translate-y-1
                                                hover:shadow-lg
                                                transition-all
                                                duration-300
                                            "
                                        >
                                            <img
                                                src={input.label}
                                                alt="Choose profile image"
                                                className="
                                                    w-[50px]
                                                    h-[50px]
                                                    object-contain
                                                "
                                            />
                                        </label>
                                    </>
                                ) : (

                                    <>
                                        <label
                                            className="
                                                mb-[6px]
                                                block
                                                text-start
                                            "
                                            htmlFor={`input${index}`}
                                        >
                                            {input.label}
                                        </label>

                                        <input
                                            name={input.name}
                                            className="
                                                transition-all
                                                duration-300
                                                hover:-translate-y-1
                                                hover:shadow-lg
                                                hover:border-blue-400
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-300
                                                rounded-2xl
                                                border
                                                mb-[20px]
                                                cursor-pointer
                                                border-gray-400
                                                bg-gray-300
                                                p-[16px]
                                                w-full
                                            "
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={`input${index}`}
                                            onChange={dataHandiling}
                                        />
                                    </>
                                )}

                            </div>
                        )
                    })}

                </div>

                <div>

                    <input
                        type="submit"
                        value={btn}
                        className="
                            mb-[10px]
                            cursor-pointer
                            w-[300px]
                            h-[47px]
                            rounded-2xl
                            bg-blue-500
                            text-white
                            text-2xl
                            transition-all
                            duration-300
                            hover:-translate-y-1
                        "
                    />

                    <div className="flex gap-[8px] justify-center">

                        <p>
                            {footer.description}
                        </p>

                        <Link
                            to={footer.link.url}
                            className="underline text-blue-500"
                        >
                            {footer.link.content}
                        </Link>

                    </div>

                </div>

            </div>

        </form>
    )
}

export default AuthForm