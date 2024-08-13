
import { useNavigate, useLocation } from 'react-router-dom';

function withRouter(Component:any) {
  return function WrappedComponent(props:any) {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} navigate={navigate} location={location} />;
  }
}

export default withRouter;
