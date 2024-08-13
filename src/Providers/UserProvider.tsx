import  { ReactNode } from 'react'
import axios from 'axios';
import Loading from '../Components/Loading';
import { userContext } from '../Context';
import { useState ,useEffect} from 'react';
import { User } from '../Context';
function UserProvider({children}:{children:ReactNode}) {
    const [user, setUser] = useState<User|undefined>();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

if (loading) {
    return <Loading />;
  }
  return (
<userContext.Provider value={{loggedIn:!!user,user,setUser}}>
    {children}
</userContext.Provider>
  )
}

export default UserProvider
