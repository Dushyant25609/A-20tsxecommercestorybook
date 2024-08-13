
import { useField } from 'formik'
function FormikHOC(IncomingComponent:any) {
    function OutgoingComponent({name,type,placeholder,...rest}:{name:string,type:string,placeholder:string}){
      
    const field=useField(name);
   
    const [data,meta]=field;
    const {onBlur,onChange,value}=data;
    const {touched,error}=meta;

        return (
            <>
            <IncomingComponent
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            error={error}
            touched={touched}
            name={name}
            type={type}
            placeholder={placeholder}
            {...rest}
            
            />
           
            </>
          )
    }
    return OutgoingComponent;
 
}

export default FormikHOC
