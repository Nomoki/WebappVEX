import { Route, Redirect } from 'react-router-dom';


export default function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={() => auth
          ? children
          : <Redirect to="/login" />
        }
      />
    );
  }

