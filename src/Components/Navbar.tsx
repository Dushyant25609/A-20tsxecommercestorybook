import  { FC, useState } from 'react'
import { Link} from 'react-router-dom'
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownFill } from "react-icons/ri";
import { withUser,withCart } from './withProvider';
import { useNavigate} from 'react-router-dom';
import { User } from '../Context';
type productsProps={
  totalCount:number,
  user:User,
  setUser:(a:{}|undefined)=>void

}
const Navbar:FC<productsProps>=({totalCount,user,setUser}) =>{
 const navigate=useNavigate()
  if(!user){
    navigate('/login');
   }
  
  const [dropdownOpen,setDropdownOpen]=useState(false)
  function toggleDropdown(){
    setDropdownOpen(!dropdownOpen)
  }
  function handleLogout(){
    localStorage.removeItem("token")
    setUser(undefined)
    
  }

  return (
    <>
    <div className="flex w-full top-0 fixed justify-between bg-gray-400 ">
        <div className="flex flex-col justify-center">
        
    <Link to="/"><img className=" ml-2 max-w-16"src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-1024.png" alt="" /></Link> 
    </div >
    <div className='flex flex-row  gap-4 items-center'>
    <div className='border rounded-xl  hover:bg-gray-500 border-black p-2'>
    
            <button onClick={toggleDropdown} className="  flex items-center gap-2 focus:outline-none">
              Hello, {user && user.full_name}
            
            <RiArrowDropDownFill />
            </button>
          
            {dropdownOpen && (
              <>
              <div className="absolute right-0 mt-2 mr-8 max-w-30 bg-white border border-black rounded-md shadow-lg z-10">
                <ul className="py-1">
                
                  <li className="block px-4 py-2 text-black font-bold">
                      Welcome {user.full_name}
                  </li>
                  <li className="cursor-pointer px-4 py-2 flex justify-center text-gray-800 hover:bg-gray-100">
                      <a  onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
              </>
            )}
          </div>
         
    <Link to="/login"><CgProfile className='text-3xl '/></Link>
    <div className="flex flex-col static">
     <Link to="/cart"><PiShoppingCartSimpleLight className=' mt-4 mr-2 text-3xl'/></Link>
     <span className=' relative left-2 bottom-9 border rounded-full border-black bg-red-500  text-white  px-1 hover:bg-black self-center text-xs ' >{totalCount}</span>
     </div>
     </div>
    </div>
    </>
  )
}

export default withUser(withCart( Navbar))
