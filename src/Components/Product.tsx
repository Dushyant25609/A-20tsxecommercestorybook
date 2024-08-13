import {FC} from 'react'
import { Link } from 'react-router-dom'
type productsProps={
  thumbnail:string,
  price:number,
  title:string,
  id:number
}
const Product:FC<productsProps>=({thumbnail,price,title,id})=> {
  return (
   <>
   <Link to={"/ProductDetail/"+ id}>
   <div key={id} className=" max-w-96 flex flex-col ml-12 m-4 transform transition duration-150 hover:scale-105 hover:shadow-2xl shadow-xl">
   
    <img className=" h-full w-full"src={thumbnail} alt="" />
   

        <h1 className=" p-2 text-m">{title}</h1>
        <span className="grow"></span>
    
        <img className="w-16 hover:bg-sky-700"src="https://i.ibb.co/tc8FTpS/rating-1.png" alt="" />
        <p className="p-2 text-sm">Rs. {price}</p>
       

   
   </div>
   </Link> 
   </>
  )
}

export default Product
