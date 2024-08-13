import React from 'react'
import { Link } from 'react-router-dom'
function EmptyCart() {
  return (
    <div className='  m-16 flex justify-center items-center'>
        <div className='  flex flex-col justify-center items-center gap-4'>
      <img
            className="max-w-52"
            src="https://st2.depositphotos.com/6628792/9630/v/950/depositphotos_96308306-stock-illustration-shopping-cart-icon.jpg"
            alt=""
          />
          <p className='text-3xl font-bold'>Your Cart is <span className='text-red-600'>Empty!</span></p>
          <Link to='/'className=' hover:bg-gray-500 bg-gray-300 w-82 p-4 rounded-xl text-xl'>Discover Products</Link>
          </div>
    </div>
  )
}

export default EmptyCart
