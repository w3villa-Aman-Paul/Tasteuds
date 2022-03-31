import * as React from "react"
import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({component: Component , ...rest}) => {

    const { authState } = useSelector((state) => state.auth);
    
         return(
              <Route {...rest}
                   render={(props) => authState.access_token  ? (
                             < Component {...props} />
                        ): (
                             <Redirect to={() => navigation.navigate('SignIn')} />
                        )
              }
              />
         );
    };


export default PrivateRoute;