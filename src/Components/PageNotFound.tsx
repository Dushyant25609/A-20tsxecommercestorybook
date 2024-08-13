
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="h-96 mt-16 text-3xl flex flex-col justify-start items-center ">
      <img className=" p-2 h-1/2"src="https://i.ibb.co/bsKNw1m/Pagenot-Found.png" alt="" />
      <h1>Page Not Found</h1>
        <p className='text-gray-500 text-xl'>The page you entered not Found</p>
        <Link to="/">
        <button className="border-black border px-8 p-2 rounded-md hover:bg-gray-500 mt-8 text-xl active:bg-gray-300 focus:ring">Home</button>
        </Link>
    </div>
  )
}

export default PageNotFound
