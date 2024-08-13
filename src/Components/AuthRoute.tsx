
import { Navigate } from 'react-router-dom'

import { withUser } from './withProvider'
import { User } from '../Context'
function AuthRoute({user,children}:{children:any,user:User}) {
  if(user){
    console.log("rinining")
   return <Navigate to='/' replace></Navigate>
  }
 
  return children
}

export default withUser(AuthRoute)
