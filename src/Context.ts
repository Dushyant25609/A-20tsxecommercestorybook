import React,{ createContext } from "react"
export interface Alert {
  
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

// Define the type for the context
interface AlertContextType {
  alert: Alert | undefined;
  setAlert: (alert: Alert) => void;
  removeAlert: () => void;
}

// Provide a default value that matches the type
const defaultAlertContextValue: AlertContextType = {
  alert: undefined,
  setAlert: () => {},
  removeAlert: () => {},
};

export const AlertContext = createContext<AlertContextType>(defaultAlertContextValue);
interface CartContextType {
    cartItems: { [key: number]: number };
    onAddtoCart: (productId: number, no: number) => void;
    updateCart: (newCart: { [key: number]: number }) => void;
    totalCount: number;
  }
  
  const defaultContextValue: CartContextType = {
    cartItems: {},
    onAddtoCart: () => {},
    updateCart: () => {},
    totalCount: 0,
  };
  export const CartContext=createContext<CartContextType>(defaultContextValue)
  type UserValueType={
    user:{}|undefined,
    setUser: React.Dispatch<React.SetStateAction<User |undefined>>,
    loggedIn:boolean,
  }
  export interface User {
    id: number;
    full_name: string;
    email: string;
    // Add other fields as necessary
  }
export const userContext=createContext<UserValueType>({
    user: {},
    setUser: () => {},
   loggedIn:false,
  })


