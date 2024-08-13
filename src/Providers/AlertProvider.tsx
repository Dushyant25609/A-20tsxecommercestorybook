
import { AlertContext } from '../Context';
import { useState,ReactNode} from 'react';
import { Alert } from '../Context';
type AlertProviderProps = {
  children: ReactNode;
};
function AlertProvider({ children }: AlertProviderProps) {
    const [alert, setAlert] = useState<Alert|undefined>();
    function removeAlert() {
        setAlert(undefined);
      }
  return (
    <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>{children}
        </AlertContext.Provider>
  )
}

export default AlertProvider
