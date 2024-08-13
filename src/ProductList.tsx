import React, {   useEffect} from 'react'
import ProductMapping from './ProductMapping'
import { useState } from 'react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Loading from './Components/Loading';
import { getProductList } from './Api';
import { range } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductList() {

const [productList,setProductList] = useState([]);
const [loading,setLoading]=useState(true);


  const [totalPages, setTotalPages] = useState(1); 
  let [searchParams, setSearchParams] = useSearchParams();
  const ITEMS_PER_PAGE = 9;



 const params=Object.fromEntries([...searchParams])


let {query,sort,pageNo} = params

query=query||""
sort=sort||"default"
 let page=+pageNo||1
 
useEffect( function(){
  let sortBy,sortType;

if(sort=="name"){
  sortBy="title"
}
else if(sort=="highTolow"){
  sortBy="price"
  sortType="desc"
}
else if(sort=="lowTohigh"){
   sortBy="price"
}
  let p =getProductList(page,query,sortBy,sortType,ITEMS_PER_PAGE);
  p.then(function(response){
    
   setProductList(response.products)
   setTotalPages(Math.ceil(response.total/ITEMS_PER_PAGE))
   setLoading(false);
  })
},[sort,query,page])

function handleQuery(e:React.ChangeEvent<HTMLInputElement>){
  setSearchParams({...params,query:e.target.value})
  
}


  function handlePageChange(newPage:number) {
  setSearchParams({...params, pageNo: newPage.toString() });
}

function handleFilter(e:React.ChangeEvent<HTMLSelectElement>){
  setSearchParams({...params,sort:e.target.value},
   );
}

if(loading){
 return <Loading/>
}

  return (

      
   <>
   <div className='bg-gray-200 mt-24 mb-16 mx-16 '>
      <div className="flex justify-end max-w-full gap-4 p-2">
        <input type="text" className="w-11 md:w-44 p-2  border-black border-2" placeholder='Search Items' value={query} onChange={handleQuery}/>
        <select  className="p-2 border-2 w-11 md:w-44 border-black" name="Sorted" id="sort" onChange={handleFilter} value={sort}>
          <option value="default">Default Sorting</option>
          <option value="lowTohigh">Price Low to High</option>
          <option value="highTolow">Price High to Low</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

    {productList.length>0 && <ProductMapping products={productList}/>}
    {productList.length==0 && <div className='flex h-80 items-center justify-center  m-4 text-black text-3xl'>Result Not Found</div>}
    <div className='mt-6   flex items-center mb-2 ml-8 gap-1'>
     {(page>1 ) && (
     <HiArrowNarrowLeft className='text-4xl border border-black' onClick={() => handlePageChange(page-1 )} />
    )
  } 
   {page < totalPages && range(page,page+2).map((item:number)=>

   {

    return (page < totalPages) && <Link  to={'?'+new URLSearchParams({...params,pageNo:item.toString()})}  className={`border border-black py-1 px-4 ${page === item ? 'bg-gray-500' : ''}`}>{item}</Link>
    }

   )}
   { (page < totalPages) && (
     <HiArrowNarrowRight className='text-4xl border border-black' onClick={() => handlePageChange(page+1 )} />
    )
  }
 
   
   
   
    
  

    </div>
    </div>
  </>
  )
}

export default ProductList
