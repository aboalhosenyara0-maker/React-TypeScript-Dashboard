import { useRef, type Dispatch, type FormEvent, type SetStateAction } from "react"
import upload from "../../assets/upload.png"

export interface product {
    name : string
    price: string
    image:Blob | null
}
export interface OldData {
    id:number
    name : string
    price: string
    image_url:string
}

const ItemForm = ({setData , oldData} : {setData : Dispatch<SetStateAction<product>> , oldData? : OldData } ) => {
    const data = useRef<product>({
        name : "",
        price: "",
        image:null
    })
    const sendData =(event:FormEvent)=>{
        event.preventDefault()
        setData(data.current)
    }
    return (
        <div>

            <form onSubmit={sendData} >
                <div className="flex justify-between p-3">
                    <div className="dark:text-amber-50">
                        <div className="mb-8 mt-4">
                            <label htmlFor="name">Product Name: <br/></label>
                            <input type="text" placeholder="Enter Product Name " id="name" className=" mt-3 text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-2xl border mb-[20px] cursor-pointer border-gray-400 bg-gray-300 p-[16px] w-140" 
                            onChange={(event) => data.current ={...data.current , name :event.target.value}} defaultValue={oldData?.name} required/>
                        </div>
                        <div>
                            <label htmlFor="price">Product Price: <br/></label>
                            <input type="text" placeholder="Enter Product Price" id="price" className="mt-3 text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-2xl border mb-[20px] cursor-pointer border-gray-400 bg-gray-300 p-[16px] w-140"
                            onChange={(event) => data.current ={...data.current , price :event.target.value}} defaultValue={oldData?.price} required/>
                        </div>
                    </div>
                    <div className="w-[50%] dark:text-amber-50 cursor-pointer border flex justify-center items-center text-center">
                        <label htmlFor="image" className="text-2xl cursor-pointer"> {oldData?.image_url ? <img src={oldData?.image_url} alt=""  className=" ml-6 w-[180px] h-[180px] object-contain"/> :  <img src={upload} alt=""  className="  dark:brightness-0 dark:invert"/>} <br /> upload Product Image</label>
                        <input type="file" name="" id="image" className=" hidden  "
                        onChange={(event) => data.current ={...data.current , image  :event.target.files?.[0]}}/>
                    </div>
                </div>
                <input type="submit" value={oldData ? "Edite" : "Create"} className="ml-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 focus:outline-none rounded-2xl mb-[20px] cursor-pointer border-0 bg-blue-500 p-[16px] w-50 text-amber-50 " />
            </form>
        </div>
    )
}

export default ItemForm
