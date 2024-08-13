import { useContext} from 'react'
import { AlertContext,CartContext,userContext} from '../Context'


function withProvider(provider:any){
function myHOC(IncomingComponent:any) {
    function OutgoingComponent(props:any){
        const contextInfo:any=useContext(provider)
        return <IncomingComponent {...props} {...contextInfo} />
    }

  return OutgoingComponent
  
}
return myHOC;
}
export default withProvider
export const withUser=withProvider(userContext)
export const withAlert=withProvider(AlertContext)
export const withCart=withProvider(CartContext)


