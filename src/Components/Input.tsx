import FormikHOC from './FormikHOC'
import React,{FC} from 'react'

type InputProps={
  type:string,
  name: string,
  placeholder?: string
  touched?: boolean;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value: string | number;

}
const Input:FC<InputProps>=({type,name,placeholder,touched,error,onChange,onBlur,value,...rest})=> {
  console.log("typeInput",type)
  let  bordercolor;
  if(touched && error){
      bordercolor="border-red-500"
  }
  return (
    <>
    
     <div className="flex flex-col justify-start">
      <input type={type} name={name}  onChange={onChange} onBlur={onBlur} value={value} placeholder={placeholder} {...rest} className={"py-1 w-64 rounded-md px-1 border border-black   "+bordercolor} />
      {touched&&error && <div className="text-sm  text-red-500">{error}</div>}
      </div>
    </>
  )
}
export const FormikInput=FormikHOC(Input)
export default Input
