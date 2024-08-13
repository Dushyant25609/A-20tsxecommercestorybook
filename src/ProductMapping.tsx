
import Product from './Components/Product'
function ProductMapping({products}:{products:any}) {
  return (
    <div className=" flex flex-col sm:flex sm:flex-row sm:flex-wrap ">
      {products.map(function(item:any){
        return( <Product key={item.id} {...item}></Product>)
      })}
      
    </div>
    
  )
}

export default ProductMapping
