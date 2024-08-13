import {FC} from "react";
import { Link } from "react-router-dom";
import { Form, Formik} from "formik";
import * as Yup from "yup";
import { FormikInput } from "./Input";

import axios from "axios";
import { withAlert,withUser } from "./withProvider";
import { Alert } from "../Context";
type props={
  setAlert: (alert: Alert) => void,
  setUser:(a:{})=>void,
}
const SignUp:FC<props>=({setAlert,setUser})=> {

  const schema = Yup.object().shape({
  
    fullName: Yup.string().required("Required Field"),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
   
  });
  type values={
    fullName:string,email:string,password:string
  }
  function saveDataToApi(values:values){
  
    axios.post("https://myeasykart.codeyogi.io/signup",{
      fullName:values.fullName,
      email:values.email,
      password:values.password
    }).then((response)=>{
  
      setAlert({type:"success", message : "SignUp Successfull"})
      setTimeout(()=>{
        
        const {user,token}=response.data
        localStorage.setItem("token",token)
        setUser(user)
      
      },2000)

    }).catch(()=>{
     setAlert({type:"error", message : "Already Registered"})
    })
  }
 
  const initialValues={
       fullName:"",
        email: "",
        password: "",
       
      };

  return (
    <>
      <div className="max-h-screen flex mt-20  justify-center ">
        <Formik  initialValues={initialValues} validationSchema={schema} onSubmit={saveDataToApi} >
        <Form  
          className="flex flex-col gap-2  justify-center items-center "
        >
          <h1 className="text-4xl font-bold my-8 px-6 py-4 bg-slate-400 rounded-xl" >Sign up Page</h1>
       
        
            <FormikInput type="text" placeholder="Full Name" name="fullName"/>
            <FormikInput type="email" placeholder="Enter Email" name="email"/>
            <FormikInput type="password" placeholder="Password" name="password"/>
            
         
          <div className="w-64 flex justify-between">
            <button
              type='reset'
              className="py-1 rounded-xl bg-gray-400 mt-2 hover:bg-gray-500 w-20 " 
            >
              Reset
            </button>
            <button
              type="submit"
              className="py-1 rounded-xl bg-gray-400 mt-2 hover:bg-gray-500 w-20"
              
            >
              SignUp
            </button>
          </div>
          <p className="mt-4 text-xl">
            Already an user?{" "}
            <Link to="/login">
              <span className="text-purple-700"> Login</span>
            </Link>
          </p>
        </Form>
        </Formik>
      </div>
    </>
  );
}

export default withUser(withAlert(SignUp));
