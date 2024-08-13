import {FC }from 'react'
import { Link} from "react-router-dom";
import {  withFormik,FormikProps } from 'formik';
import * as Yup from 'yup';
import Input from "./Input";

import axios from "axios";

import { withAlert, withUser } from "./withProvider";



type values={
  email:string,password:string
}
function callLoginApi(values:values,bag:any){
  
    axios.post("https://myeasykart.codeyogi.io/login",{
      email:values.email,
      password:values.password,
    }).then((response)=>{
      
      bag.props.setAlert({type:"success", message : "Login Successfull"})
      
  
      setTimeout(()=>{
        
      const {user,token}=response.data
      localStorage.setItem("token",token)
      bag.props.setUser(user)
    
    },2000)

    }).catch(()=>{
      bag.props.setAlert({type:"error", message : "Invalid Credential"})
    })
  }
  const schema=Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
const InitialValues={
    email:"",
    password:"",
  }

  
interface ExternalProps {
  setAlert: (alert: { type: string; message: string }) => void;
  setUser: (user: any) => void;
}

// Combine formik and external props
type LoginPageProps = FormikProps<values> & ExternalProps;
const LoginPage:FC<LoginPageProps>=({touched,errors,handleChange,handleBlur,values,handleSubmit})=> {

return (
    <>
     
     
      <div className="max-h-screen flex items-center mt-16  justify-center ">
      
        <form onSubmit={handleSubmit}  className="flex flex-col  justify-center items-center ">
          <h1 className="text-4xl font-bold my-8 px-6 py-4 bg-slate-400 rounded-xl" >Login Page</h1>
          <div className="flex flex-col gap-2">
         <Input  type="email" name="email"  placeholder="Enter Username"   value={values.email} error={errors.email} touched={touched.email} onBlur={handleBlur} onChange={handleChange} />
         <Input  type="password" name="password" placeholder="Password"  value={values.password} error={errors.password} touched={touched.password} onBlur={handleBlur} onChange={handleChange} />
         </div>
          <button type="submit"  className="bg-gray-400 disabled:bg-gray-100 mt-4 hover:bg-gray-500 w-64 px-16 py-2">
              Login
            </button>
            <div className=" text-md flex fles-row justify-end w-64">
            
                <Link to='/ForgotPassword'><p className="text-purple-700 ">Forgot Password?</p></Link>
            </div>
            <p className='mt-8 text-xl'>Don't have an account? <Link to="/signUp"> <button type="button"  className="text-purple-700">SignUp</button></Link></p>
        
        </form>
   
      </div>
    </>
  );
}
const myHOC = withFormik<LoginPageProps, values>({
  validationSchema: schema,
  mapPropsToValues: () => InitialValues,
  handleSubmit: callLoginApi,
})(LoginPage);
export default withAlert(withUser(myHOC))
