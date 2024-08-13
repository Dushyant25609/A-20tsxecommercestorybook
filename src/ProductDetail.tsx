import React, { useEffect,FC } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { getProduct } from './Api';
import Loading from './Components/Loading';
import PageNotFound from './Components/PageNotFound';
import { withCart } from './Components/withProvider';
type ComponentsProps={
  onAddtoCart:(a:number,b:number)=>void
}

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};
const ProductDetail:FC<ComponentsProps>=({onAddtoCart})=>{
    const[ProductDetail,setProductDetail] =useState<Product|null>();
    const [loading,setLoading] =useState(true);
    const [count,setCount] = useState(1);
    const { id } = useParams<{ id?: string }>();
    const idNumber = id ? +id : 0;
    function HandleInputChange(e: React.ChangeEvent<HTMLInputElement>){
      setCount(+(e.target.value));
    }
    function HandleAddtoCart(){
     onAddtoCart(idNumber,count);
    }
    useEffect(()=>{
        const p=getProduct(idNumber);
        p.then((response)=>{
        
            setProductDetail(response)
            setLoading(false);
            setCount(1);
        }).catch(function(){
          setLoading(false);
        }
        )
    },[idNumber])

   if(loading){
   return <Loading/>
   }
    if(!ProductDetail){
      return <PageNotFound/>
    }
  return (
ProductDetail ? <>
<div className='bg-gray-200 mt-20 m-4'>
<Link to="/"><HiArrowSmLeft className='text-3xl'/></Link>
<div className=" max-h-80 m-2 flex items-center justify-center">
      <div className="max-w-4xl flex items-start  m-8 gap-x-6 border-2 p-6  shadow-2xl">
        <img
          className="max-w-80"
          src={ProductDetail.thumbnail}
          alt=""
        />
        <div className="flex flex-col items-start">
          <h1 className="text-4xl mb-8">{ProductDetail.title}</h1>
          <p className="text-2xl mb-8 font-bold">Rs. {ProductDetail.price}</p>
          <p className="mb-16 text-gray-700">
          {ProductDetail.description}
          </p>
          <div className="flex gap-x-4">
            <input className="border-2 pl-2 py-2 w-16" type="number" value={count} onChange={HandleInputChange}/>
          <button onClick={HandleAddtoCart} className="bg-gray-400 hover:bg-gray-500  px-16 py-2">Add to Cart</button> 
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between">
   <div className="p-2"> {idNumber>1 && <Link to={"/ProductDetail/"+(idNumber-1)}><HiArrowSmLeft className='text-5xl '/>Previous Item</Link>}</div>
   <div className="p-2"><Link to={"/ProductDetail/"+(idNumber+1)}><HiArrowSmRight className='text-5xl '/>Next Item</Link></div>
    
    </div>
    </div>
</>:<Loading/>
  )
}

export default withCart(ProductDetail)
