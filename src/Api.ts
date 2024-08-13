import axios from "axios"
export  function getProductList(pageNo:number,search:string,sortBy:string|undefined,sortType:string|undefined,items_per_page:number){

    type paramsProps={
        page:number
        sortBy:string
        order:string;
        skip:number,
        limit:number,
        q:string,
    }
    const params:paramsProps={
        page: 0,
        sortBy: "",
        order: "",
        skip: 0,
        limit: 0,
        q: ""
    }

   
    if(pageNo){
        params.page=pageNo
    }

 if(sortBy){
        params.sortBy=sortBy
       
    }
    if(sortType){
        params.order=sortType
       
    }
    if(items_per_page|| pageNo){
    params.skip=(pageNo-1)*items_per_page
   
    params.limit=items_per_page
    }
    console.log("page",params.page)
    console.log("skip",params.skip)
    console.log("limit",params.limit)
    if(search){
        params.q=search
        params.skip=0
        params.limit=items_per_page
      }
   return axios.get("https://dummyjson.com/products/search",{
params
}
   ).then(response=>{
    return response.data
   }
   )

}
export function getProduct(id:number){
    return axios.get(`https://dummyjson.com/products/${id}`).then((response)=>{
        return response.data;
    });
}
export function setCart(cart:{}){
    return axios.post("https://myeasykart.codeyogi.io/carts",{data:cart},
        {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }
    )

}
export function getCart(){
    return axios.get("https://myeasykart.codeyogi.io/carts",{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    }).then((response)=>{
        console.log("resp",response)
      return response.data.reduce((acc:{}, { product, quantity }:{ product:any, quantity:number }) => {
           return {...acc,[product.id]: quantity}
          }, {});
    })
    
}
