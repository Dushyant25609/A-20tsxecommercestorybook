import {memo} from 'react'
import { ImSpinner } from "react-icons/im";
function Loading() {
  return (
   <>

      <div className="  h-full  text-5xl flex items-center justify-center animate-spin">
      <ImSpinner />  
</div>
    </>
  )
}

export default memo(Loading)
